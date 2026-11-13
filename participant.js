
import { db, auth } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import Chart from "https://cdn.jsdelivr.net/npm/chart.js/auto/+esm";

const ADMIN_UID = "QK64im00aVNuQPVVH3skmZky6xD2";

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

function showMessage(message) {
  $("participantName").textContent = message;
}

function countRange(value, start, end) {
  let count = 0;
  for (let i = start; i < end; i++) {
    if (value[i] === "1") count++;
  }
  return count;
}

function makeItem(name, done) {
  const row = document.createElement("div");
  row.className = "detail-row";

  const label = document.createElement("span");
  label.textContent = name;

  const status = document.createElement("strong");
  status.textContent = done ? "✓ مكتمل" : "○ غير مكتمل";
  status.style.color = done ? "#168b55" : "#8994a3";

  row.append(label, status);
  return row;
}

function showDayDetails(state, day) {
  const progress = state.p || "";
  const dayData = progress.slice(day * 15, day * 15 + 15);

  const container = $("detailsContent");
  const section = $("dayDetails");

  container.replaceChildren();

  $("detailsTitle").textContent = `تفاصيل اليوم ${day + 1}`;

  function addGroup(title, names, startIndex) {
    const group = document.createElement("div");
    group.className = "detail-group";

    const heading = document.createElement("h3");
    heading.textContent = title;

    group.appendChild(heading);

    names.forEach((name, index) => {
      group.appendChild(
        makeItem(name, dayData[startIndex + index] === "1")
      );
    });

    container.appendChild(group);
  }

  addGroup("🕌 الصلوات", PRAYERS, 0);
  addGroup("📖 الورد", READING, 5);
  addGroup("⭐ الأعمال الصالحة", DEEDS, 10);

  const quranGroup = document.createElement("div");
  quranGroup.className = "detail-group";

  const quranTitle = document.createElement("h3");
  quranTitle.textContent = "📚 تقدم القرآن";

  const pages = document.createElement("p");
  const pageValue = state.pg?.[day] ?? state.pg?.[String(day)] ?? 0;
  pages.textContent = `عدد الصفحات المسجلة: ${Number(pageValue) || 0}`;

  quranGroup.append(quranTitle, pages);

  const juzCount = [...(state.j || "")].filter(value => value === "1").length;
  const juz = document.createElement("p");
  juz.textContent = `الأجزاء المكتملة: ${juzCount} من 30`;

  quranGroup.appendChild(juz);
  container.appendChild(quranGroup);

  section.hidden = false;
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showParticipant(state) {
  const progress = typeof state.p === "string" ? state.p : "";

  if (progress.length !== 435) {
    showMessage("بيانات المشارك غير مكتملة أو غير متوافقة.");
    return;
  }

  const totalCompleted = [...progress].filter(x => x === "1").length;
  const percentage = Math.round((totalCompleted / 435) * 100);

  const activeDays = [];
  const dailyProgress = [];

  let prayerTotal = 0;
  let readingTotal = 0;
  let deedsTotal = 0;

  const daysList = $("daysList");
  daysList.replaceChildren();

  for (let day = 0; day < 29; day++) {
    const dayData = progress.slice(day * 15, day * 15 + 15);

    const prayers = countRange(dayData, 0, 5);
    const reading = countRange(dayData, 5, 10);
    const deeds = countRange(dayData, 10, 15);

    const completed = prayers + reading + deeds;

    prayerTotal += prayers;
    readingTotal += reading;
    deedsTotal += deeds;

    if (completed > 0) activeDays.push(day + 1);

    dailyProgress.push(Math.round((completed / 15) * 100));

    const card = document.createElement("div");
    card.className = "day-item";

    const title = document.createElement("strong");
    title.textContent = `اليوم ${day + 1}`;

    const status = document.createElement("span");

    if (completed === 15) {
      status.textContent = `✅ ${completed} / 15`;
      status.style.color = "#20a765";
    } else if (completed === 0) {
      status.textContent = `⭕ ${completed} / 15`;
      status.style.color = "#98a2b3";
    } else {
      status.textContent = `🟡 ${completed} / 15`;
      status.style.color = "#d18b20";
    }

    const summary = document.createElement("span");
    summary.textContent =
      `الصلوات ${prayers}/5\nالورد ${reading}/5\nالأعمال ${deeds}/5`;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "عرض التفاصيل";
    button.onclick = () => showDayDetails(state, day);

    card.append(title, status, summary, button);
    daysList.appendChild(card);
  }

  $("participantName").textContent = state.name || "مشارك بدون اسم";
  $("currentDay").textContent =
    Number.isInteger(state.day) ? state.day + 1 : "--";

  $("overallPercentage").textContent = `${percentage}%`;
  $("overallProgress").style.width = `${percentage}%`;

  $("progressCircle").style.background =
    `conic-gradient(#20a765 ${percentage * 3.6}deg, #e0e5eb 0deg)`;

  $("totalCompleted").textContent = totalCompleted;
  $("activeDays").textContent = `${activeDays.length} / 29`;

  const oldHabitsChart = Chart.getChart("habitsChart");
  if (oldHabitsChart) oldHabitsChart.destroy();

  new Chart($("habitsChart"), {
    type: "bar",
    data: {
      labels: ["الصلوات", "الورد", "الأعمال الصالحة"],
      datasets: [{
        label: "عدد الإنجازات",
        data: [prayerTotal, readingTotal, deedsTotal],
        backgroundColor: ["#20a765", "#348de0", "#f5a43b"],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, max: 145 }
      }
    }
  });

  const oldProgressChart = Chart.getChart("progressChart");
  if (oldProgressChart) oldProgressChart.destroy();

  new Chart($("progressChart"), {
    type: "line",
    data: {
      labels: Array.from({ length: 29 }, (_, i) => i + 1),
      datasets: [{
        label: "نسبة إنجاز اليوم %",
        data: dailyProgress,
        borderColor: "#348de0",
        backgroundColor: "rgba(52, 141, 224, 0.15)",
        pointBackgroundColor: "#348de0",
        pointRadius: 4,
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { callback: value => value + "%" }
        }
      }
    }
  });

  const closeButton = $("closeDetails");
  if (closeButton) {
    closeButton.onclick = () => {
      $("dayDetails").hidden = true;
    };
  }
}

async function loadParticipant(uid) {
  try {
    const userRef = doc(db, "users", uid, "private", "data");
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      showMessage("لا توجد بيانات محفوظة لهذا المشارك.");
      return;
    }

    const state = snapshot.data().state;

    if (!state) {
      showMessage("بيانات المشارك غير موجودة.");
      return;
    }

    showParticipant(state);

  } catch (error) {
    console.error("خطأ تحميل بيانات المشارك:", error);
    showMessage("حصل خطأ أثناء تحميل البيانات. راجع صلاحيات Firebase.");
  }
}

const params = new URLSearchParams(window.location.search);
const participantId = params.get("id");

if (!participantId) {
  showMessage("لم يتم تحديد المشارك.");
} else {
  onAuthStateChanged(auth, async user => {
    if (!user) {
      showMessage("يجب تسجيل دخول الأدمن أولاً.");
      return;
    }

    if (user.uid !== ADMIN_UID) {
      showMessage("ليس لديك صلاحية لعرض تفاصيل المشاركين.");
      return;
    }

    await loadParticipant(participantId);
  });
}
