
import { db, auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  collectionGroup,
  getDocs,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import Chart from "https://cdn.jsdelivr.net/npm/chart.js/auto/+esm";

/* إعدادات المشروع */
const ADMIN_UID = "QK64im00aVNuQPVVH3skmZky6xD2";

const TOTAL_ITEMS = 435;
const DAYS = 29;
const TASKS_PER_DAY = 15;

const PRAYERS = ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];
const READING = ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];
const DEEDS = [
  "صيام اليوم",
  "التراويح",
  "أذكار الصباح",
  "أذكار المساء",
  "الصدقة"
];

const $ = id => document.getElementById(id);

const loginSection = $("login");
const dashboard = $("dashboard");
const message = $("message");
const list = $("participantsList");
const searchInput = $("participantSearch");

let participants = [];
let progressChart = null;
let drawerRequestNumber = 0;

/* أدوات مساعدة */

/* يدعم النصوص والمصفوفات لأن بيانات التحدي محفوظة كنص */
function countDone(value) {
  if (typeof value === "string") {
    return [...value].filter(item => item === "1").length;
  }

  if (Array.isArray(value)) {
    return value.filter(item => String(item) === "1").length;
  }

  return 0;
}

function getBits(value) {
  if (typeof value === "string") {
    return [...value];
  }

  if (Array.isArray(value)) {
    return value.map(item => String(item));
  }

  return [];
}

function percentFor(completed) {
  return Math.round((completed / TOTAL_ITEMS) * 100);
}

function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function getThemeColors() {
  const dark = document.documentElement.dataset.theme === "dark";

  return {
    text: dark ? "#e8efe0" : "#183426",
    grid: dark
      ? "rgba(184,199,184,.18)"
      : "rgba(24,52,38,.13)"
  };
}

/* إظهار الشاشات */

function showLogin() {
  loginSection.hidden = false;
  dashboard.hidden = true;
  $("logoutBtn").hidden = true;
  closeDrawer();
}

function showDashboard() {
  loginSection.hidden = true;
  dashboard.hidden = false;
  $("logoutBtn").hidden = false;
}

/* الإحصائيات */

function renderStats() {
  const total = participants.length;

  const average = total
    ? Math.round(
        participants.reduce(
          (sum, participant) => sum + participant.percentage,
          0
        ) / total
      )
    : 0;

  $("totalUsers").textContent = total.toLocaleString("ar-EG");
  $("averageProgress").textContent = `${average}%`;

  $("advancedUsers").textContent =
    participants.filter(p => p.percentage >= 50)
      .length.toLocaleString("ar-EG");

  $("activeUsers").textContent =
    participants.filter(p => p.completed > 0)
      .length.toLocaleString("ar-EG");

  $("completionValue").textContent = `${average}%`;

  const degrees = average * 3.6;

  $("completionRing").style.background =
    `conic-gradient(#e2bd68 0deg,#29c77b ${degrees}deg,rgba(133,165,139,.18) ${degrees}deg)`;
}

/* قائمة المشاركين */

function renderParticipants() {
  const query = (searchInput?.value || "").trim().toLowerCase();

  const filtered = participants.filter(participant => {
    const searchText = [
      participant.name,
      participant.email,
      participant.uid
    ].join(" ").toLowerCase();

    return searchText.includes(query);
  });

  $("visibleCount").textContent =
    `${filtered.length.toLocaleString("ar-EG")} مشارك`;

  $("emptySearch").hidden = filtered.length !== 0;

  if (filtered.length === 0) {
    list.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">
          ${participants.length
            ? "لا توجد نتائج مطابقة للبحث."
            : "لا يوجد مشاركون حتى الآن."}
        </td>
      </tr>
    `;
    return;
  }

  list.innerHTML = filtered.map(participant => `
    <tr>
      <td>
        <div class="participant-name">
          <span class="table-avatar">👤</span>
          ${safeText(participant.name || "مشارك")}
        </div>
      </td>

      <td class="muted-cell">
        ${safeText(participant.email || participant.uid)}
      </td>

      <td>
        <span class="status-pill">
          ${participant.completed > 0 ? "نشط" : "لم يبدأ"}
        </span>
      </td>

      <td class="progress-cell">
        <b>${participant.percentage}%</b>
        <div class="progress-line">
          <span style="width:${participant.percentage}%"></span>
        </div>
      </td>

      <td>
        ${participant.completed.toLocaleString("ar-EG")}
        / ${TOTAL_ITEMS}
      </td>

      <td>
        <button
          class="details-button"
          type="button"
          data-uid="${safeText(participant.uid)}"
        >
          عرض التفاصيل ←
        </button>
      </td>
    </tr>
  `).join("");

  list.querySelectorAll("[data-uid]").forEach(button => {
    button.addEventListener("click", () => {
      openDrawer(button.dataset.uid);
    });
  });
}

/* الرسم البياني */

function renderChart() {
  const canvas = $("progressChart");
  if (!canvas) return;

  const colors = getThemeColors();

  if (progressChart) {
    progressChart.destroy();
    progressChart = null;
  }

  const sorted = [...participants]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 8);

  progressChart = new Chart(canvas, {
    type: "line",
    data: {
      labels: sorted.map(p => (p.name || "مشارك").slice(0, 12)),
      datasets: [{
        label: "نسبة الإنجاز",
        data: sorted.map(p => p.percentage),
        borderColor: "#35c985",
        backgroundColor: "rgba(41,199,123,.17)",
        fill: true,
        tension: .38,
        pointRadius: 4,
        pointBackgroundColor: "#e2bd68",
        pointBorderColor: "#e2bd68"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: context => `نسبة الإنجاز: ${context.parsed.y}%`
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: colors.text,
            maxRotation: 0,
            autoSkip: true
          },
          grid: { color: "transparent" }
        },
        y: {
          min: 0,
          max: 100,
          ticks: {
            color: colors.text,
            callback: value => `${value}%`
          },
          grid: { color: colors.grid }
        }
      }
    }
  });
}

/* تحميل المشاركين */

async function loadParticipants() {
  list.innerHTML = `
    <tr>
      <td colspan="6" class="empty-state">
        جاري تحميل المشاركين...
      </td>
    </tr>
  `;

  try {
    const snapshot = await getDocs(collectionGroup(db, "private"));
    const loaded = [];

    snapshot.forEach(item => {
      const uid = item.ref.parent?.parent?.id;

      if (!uid || uid === ADMIN_UID) return;

      const raw = item.data() || {};
      const state = raw.state || {};

      const completed = countDone(state.p);

      loaded.push({
        uid,
        name: state.name || raw.name || "مشارك",
        email: raw.email || state.email || "",
        completed,
        percentage: percentFor(completed)
      });
    });

    const uniqueParticipants = new Map();

    loaded.forEach(participant => {
      uniqueParticipants.set(participant.uid, participant);
    });

    participants = [...uniqueParticipants.values()]
      .sort((a, b) => b.percentage - a.percentage);

    renderStats();
    renderParticipants();
    renderChart();

  } catch (error) {
    console.error("Error loading participants:", error);

    list.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">
          تعذر تحميل المشاركين. راجع صلاحيات Firestore واتصال الإنترنت.
        </td>
      </tr>
    `;
  }
}

/* النافذة الجانبية */

function openDrawerShell() {
  $("drawerBackdrop").hidden = false;

  $("participantDrawer").classList.add("open");
  $("participantDrawer").setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  drawerRequestNumber++;

  $("participantDrawer").classList.remove("open");
  $("participantDrawer").setAttribute("aria-hidden", "true");

  $("drawerBackdrop").hidden = true;
  document.body.style.overflow = "";
}

/* إنجازات اليوم */

function getDayDone(state, day) {
  const bits = getBits(state.p);

  const array = bits.slice(
    day * TASKS_PER_DAY,
    day * TASKS_PER_DAY + TASKS_PER_DAY
  );

  return {
    array,
    count: countDone(array)
  };
}

function getPagesForDay(state, day) {
  const pages = state.pg;

  if (Array.isArray(pages)) {
    return pages[day] ?? 0;
  }

  if (pages && typeof pages === "object") {
    return pages[day] ?? pages[String(day)] ?? 0;
  }

  return 0;
}

/* تفاصيل يوم محدد */

function renderDayDetails(state, day) {
  const { array, count } = getDayDone(state, day);

  $("drawerDayTitle").textContent = `إنجازات اليوم ${day + 1}`;
  $("drawerDayCount").textContent = `${count} من 15 إنجاز`;

  const groups = [
    { title: "الصلاة", names: PRAYERS, offset: 0 },
    { title: "الورد القرآني", names: READING, offset: 5 },
    { title: "الأعمال الصالحة", names: DEEDS, offset: 10 }
  ];

  const groupsHTML = groups.map(group => `
    <div class="task-group">
      <h4>${group.title}</h4>

      ${group.names.map((name, index) => {
        const done = array[group.offset + index] === "1";

        return `
          <div class="task-row">
            <span>${name}</span>
            <b class="task-state ${done ? "" : "pending"}">
              ${done ? "✓ تم" : "لم يتم"}
            </b>
          </div>
        `;
      }).join("")}
    </div>
  `).join("");

  const pages = getPagesForDay(state, day);
  const juzCount = countDone(state.j);

  $("drawerTasks").innerHTML = groupsHTML + `
    <div class="task-group">
      <h4>القرآن الكريم</h4>

      <div class="task-row">
        <span>صفحات الورد المسجلة</span>
        <b>${safeText(pages)}</b>
      </div>

      <div class="task-row">
        <span>الأجزاء المكتملة إجمالًا</span>
        <b>${juzCount} / 30</b>
      </div>
    </div>
  `;

  $("drawerDayDetails").hidden = false;

  $("drawerDaysList")
    .querySelectorAll(".day-chip")
    .forEach((button, index) => {
      button.classList.toggle("selected", index === day);
    });
}

/* عرض بيانات المشارك */

function renderDrawer(state, participant) {
  const completed = countDone(state.p);
  const percentage = percentFor(completed);

  const activeDays = Array.from(
    { length: DAYS },
    (_, day) => getDayDone(state, day).count
  ).filter(count => count > 0).length;

  $("drawerName").textContent =
    state.name || participant.name || "مشارك";

  $("drawerEmail").textContent =
    participant.email || participant.uid;

  $("drawerCompleted").textContent =
    completed.toLocaleString("ar-EG");

  $("drawerPercent").textContent = `${percentage}%`;
  $("drawerDays").textContent = activeDays.toLocaleString("ar-EG");

  $("drawerProgressLabel").textContent = `${percentage}%`;
  $("drawerProgressBar").style.width = `${percentage}%`;

  $("drawerDaysList").innerHTML =
    Array.from({ length: DAYS }, (_, day) => {
      const count = getDayDone(state, day).count;

      return `
        <button
          type="button"
          class="day-chip ${count > 0 ? "done" : ""}"
          data-day="${day}"
        >
          اليوم ${day + 1}
          <small>${count}/15</small>
        </button>
      `;
    }).join("");

  $("drawerDaysList")
    .querySelectorAll("[data-day]")
    .forEach(button => {
      button.addEventListener("click", () => {
        renderDayDetails(state, Number(button.dataset.day));
      });
    });

  $("drawerLoading").hidden = true;
  $("drawerContent").hidden = false;

  renderDayDetails(state, 0);
}

/* فتح تفاصيل مشارك */

async function openDrawer(uid) {
  const participant = participants.find(p => p.uid === uid);
  if (!participant) return;

  const requestNumber = ++drawerRequestNumber;

  openDrawerShell();

  $("drawerLoading").hidden = false;
  $("drawerContent").hidden = true;
  $("drawerDayDetails").hidden = true;

  $("drawerLoading").textContent = "جاري تحميل تفاصيل المشارك...";

  try {
    const snapshot = await getDoc(
      doc(db, "users", uid, "private", "data")
    );

    if (requestNumber !== drawerRequestNumber) return;

    if (!snapshot.exists()) {
      throw new Error("Participant data not found");
    }

    const data = snapshot.data() || {};
    const state = data.state || {};

    renderDrawer(state, participant);

  } catch (error) {
    if (requestNumber !== drawerRequestNumber) return;

    console.error("Error loading participant details:", error);

    $("drawerLoading").hidden = false;
    $("drawerLoading").textContent =
      "تعذر تحميل التفاصيل. تأكد من صلاحيات قراءة بيانات المشاركين.";

    $("drawerContent").hidden = true;
  }
}

/* تسجيل الدخول */

$("loginBtn").addEventListener("click", async () => {
  const email = $("email").value.trim();
  const password = $("password").value;

  message.textContent = "";

  if (!email || !password) {
    message.textContent =
      "من فضلك أدخل البريد الإلكتروني وكلمة المرور.";
    return;
  }

  $("loginBtn").disabled = true;
  $("loginBtn").textContent = "جاري تسجيل الدخول...";

  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (credential.user.uid !== ADMIN_UID) {
      await signOut(auth);

      message.textContent =
        "هذا الحساب غير مصرح له بدخول لوحة الإدارة.";
    }

  } catch (error) {
    console.error("Login error:", error);

    message.textContent =
      "تعذر تسجيل الدخول. راجع بيانات الحساب وحاول مرة أخرى.";

  } finally {
    $("loginBtn").disabled = false;
    $("loginBtn").textContent = "دخول إلى لوحة التحكم";
  }
});

/* تسجيل الدخول بزر Enter */

$("password").addEventListener("keydown", event => {
  if (event.key === "Enter") $("loginBtn").click();
});

$("email").addEventListener("keydown", event => {
  if (event.key === "Enter") $("loginBtn").click();
});

/* الأزرار والأحداث */

$("logoutBtn").addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
  }
});

searchInput.addEventListener("input", renderParticipants);

$("closeDrawer").addEventListener("click", closeDrawer);
$("drawerBackdrop").addEventListener("click", closeDrawer);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeDrawer();
});

/* تغيير الوضع */

function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === "dark";
  $("themeToggle").textContent = dark ? "☀️" : "🌙";
}

$("themeToggle").addEventListener("click", () => {
  const current = document.documentElement.dataset.theme;
  const next = current === "dark" ? "light" : "dark";

  document.documentElement.dataset.theme = next;
  localStorage.setItem("ramadanTheme", next);

  updateThemeButton();
  renderChart();
});

window.addEventListener("themeChanged", () => {
  updateThemeButton();
  renderChart();
});

/* التحقق من حساب الأدمن */

onAuthStateChanged(auth, async user => {
  if (!user) {
    showLogin();
    return;
  }

  if (user.uid !== ADMIN_UID) {
    await signOut(auth);
    showLogin();

    message.textContent =
      "هذا الحساب غير مصرح له بدخول لوحة الإدارة.";

    return;
  }

  showDashboard();
  updateThemeButton();

  await loadParticipants();
});

/* الوضع الأولي */
updateThemeButton();
