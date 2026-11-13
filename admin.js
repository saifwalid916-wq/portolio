
import { db, auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  collectionGroup,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import Chart from "https://cdn.jsdelivr.net/npm/chart.js/auto/+esm";

const ADMIN_UID = "QK64im00aVNuQPVVH3skmZky6xD2";

const login = document.getElementById("login");
const dashboard = document.getElementById("dashboard");
const message = document.getElementById("message");
const list = document.getElementById("participantsList");
const searchInput = document.getElementById("participantSearch");
const totalUsers = document.getElementById("totalUsers");

let participants = [];
let progressChart = null;
let loadingParticipants = false;

function getThemeColors() {
  const dark = document.documentElement.dataset.theme === "dark";

  return {
    text: dark ? "#f5f0e6" : "#172b45",
    grid: dark ? "#34445a" : "#e1e7ef"
  };
}

// تسجيل الدخول
document.getElementById("loginBtn").onclick = async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    message.textContent = "من فضلك أدخل البريد الإلكتروني وكلمة المرور.";
    return;
  }

  message.textContent = "جاري تسجيل الدخول...";

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    if (result.user.uid !== ADMIN_UID) {
      await signOut(auth);
      message.textContent = "هذا الحساب ليس حساب الأدمن.";
    }
  } catch (error) {
    console.error(error);
    message.textContent = "خطأ في البريد الإلكتروني أو كلمة المرور.";
  }
};

// تحميل المشاركين
async function loadParticipants() {
  if (loadingParticipants) return;

  loadingParticipants = true;

  totalUsers.textContent = "جاري التحميل...";
  list.replaceChildren();

  try {
    const snapshot = await getDocs(collectionGroup(db, "private"));

    participants = [];

    snapshot.forEach(item => {
      const state = item.data().state || {};

      const completed = typeof state.p === "string"
        ? [...state.p].filter(value => value === "1").length
        : 0;

      const percentage = Math.round((completed / 435) * 100);

      participants.push({
        uid: item.ref.parent.parent.id,
        name: state.name || "مشارك بدون اسم",
        completed,
        percentage
      });
    });

    participants.sort((a, b) => b.percentage - a.percentage);

    totalUsers.textContent = participants.length;

    renderParticipants();
    renderChart();

  } catch (error) {
    console.error(error);
    totalUsers.textContent = "حصل خطأ أثناء تحميل البيانات.";
    list.textContent = "راجع صلاحيات Firebase وConsole.";
  } finally {
    loadingParticipants = false;
  }
}

// عرض المشاركين
function renderParticipants() {
  list.replaceChildren();

  const query = searchInput?.value.trim().toLowerCase() || "";

  const filtered = participants
    .map((person, index) => ({ ...person, originalRank: index + 1 }))
    .filter(person => person.name.toLowerCase().includes(query));

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "لا يوجد مشاركون مطابقون للبحث.";
    list.appendChild(empty);
    return;
  }

  filtered.forEach(person => {
    const card = document.createElement("div");
    card.className = "participant-card";

    const heading = document.createElement("div");
    heading.className = "participant-card-heading";

    const name = document.createElement("h3");
    name.textContent = person.name;

    const rank = document.createElement("span");
    rank.className = "participant-rank";

    rank.textContent =
      person.originalRank === 1 ? "🥇 المركز الأول" :
      person.originalRank === 2 ? "🥈 المركز الثاني" :
      person.originalRank === 3 ? "🥉 المركز الثالث" :
      `#${person.originalRank}`;

    heading.append(name, rank);

    const percentage = document.createElement("strong");
    percentage.className = "participant-percentage";
    percentage.textContent = `${person.percentage}%`;

    const progressTrack = document.createElement("div");
    progressTrack.className = "participant-progress-track";

    const progressFill = document.createElement("div");
    progressFill.className = "participant-progress-fill";
    progressFill.style.width = `${person.percentage}%`;

    progressTrack.appendChild(progressFill);

    const completed = document.createElement("p");
    completed.className = "participant-completed";
    completed.textContent = `${person.completed} من 435 إنجاز`;

    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.className = "participant-link";
    detailsButton.textContent = "عرض التفاصيل ←";

    detailsButton.onclick = () => {
      window.location.href =
        `participant.html?id=${encodeURIComponent(person.uid)}`;
    };

    card.append(
      heading,
      percentage,
      progressTrack,
      completed,
      detailsButton
    );

    list.appendChild(card);
  });
}

// الرسم البياني
function renderChart() {
  const canvas = document.getElementById("progressChart");

  if (!canvas) return;

  if (progressChart) {
    progressChart.destroy();
  }

  const colors = getThemeColors();

  progressChart = new Chart(canvas, {
    type: "bar",

    data: {
      labels: participants.map(person => person.name),

      datasets: [{
        label: "نسبة الإنجاز %",
        data: participants.map(person => person.percentage),
        backgroundColor: "#e8b95f",
        borderColor: "#f8d993",
        borderWidth: 1,
        borderRadius: 8,
        maxBarThickness: 45
      }]
    },

    options: {
      responsive: true,

      plugins: {
        legend: {
          labels: {
            color: colors.text,
            font: {
              family: "Cairo"
            }
          }
        }
      },

      scales: {
        x: {
          ticks: {
            color: colors.text,
            font: {
              family: "Cairo"
            }
          },
          grid: {
            display: false
          }
        },

        y: {
          beginAtZero: true,
          max: 100,

          ticks: {
            color: colors.text,
            callback: value => value + "%"
          },

          grid: {
            color: colors.grid
          }
        }
      }
    }
  });
}

// البحث
if (searchInput) {
  searchInput.addEventListener("input", renderParticipants);
}

// تحديث الرسم البياني عند تغيير المظهر
window.addEventListener("themeChanged", () => {
  if (!dashboard.hidden && participants.length >= 0) {
    renderChart();
  }
});

// تسجيل الخروج
document.getElementById("logoutBtn").onclick = async () => {
  await signOut(auth);
};

// متابعة حالة تسجيل الدخول
onAuthStateChanged(auth, async user => {
  if (!user) {
    dashboard.hidden = true;
    login.hidden = false;
    return;
  }

  if (user.uid !== ADMIN_UID) {
    await signOut(auth);
    return;
  }

  login.hidden = true;
  dashboard.hidden = false;

  await loadParticipants();
});
