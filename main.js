
import { db, auth } from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
  signInAnonymously,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

let currentUser = null;
let dataReady = false;
let saveTimer = null;
let signingIn = false;

// مكان حفظ بيانات المستخدم
function getUserDataRef(uid) {
  return doc(db, "users", uid, "private", "data");
}

// حفظ البيانات في Firebase
window.saveUserData = function(state) {
  if (!currentUser || !dataReady || !state) return;

  clearTimeout(saveTimer);

  const uid = currentUser.uid;
  const safeState = JSON.parse(JSON.stringify(state));

  saveTimer = setTimeout(async () => {
    if (!currentUser || currentUser.uid !== uid || !dataReady) return;

    try {
      await setDoc(
        getUserDataRef(uid),
        {
          state: safeState,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );

      console.log("تم حفظ بيانات المستخدم بنجاح");

    } catch (error) {
      console.error("خطأ حفظ البيانات:", error);
    }
  }, 1000);
};

// تحميل العادات من Firebase
async function loadHabits() {
  try {
    const snapshot = await getDocs(collection(db, "habits"));

    snapshot.forEach((habit) => {
      console.log(habit.id, habit.data());
    });

  } catch (error) {
    console.error("خطأ تحميل العادات:", error);
  }
}

// تحميل بيانات المستخدم
async function loadUserData(uid) {
  const userRef = getUserDataRef(uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    const savedData = snapshot.data().state;

    if (savedData && window.applyCloudState) {
      window.applyCloudState(savedData);
    }

    console.log("تم تحميل بيانات المستخدم من Firebase");

  } else {
    console.log("مستخدم جديد، لا توجد بيانات محفوظة بعد");
  }
}

// متابعة تسجيل الدخول
onAuthStateChanged(auth, async (user) => {

  // لو مفيش حساب محفوظ، ننشئ حساب مرة واحدة
  if (!user) {
    currentUser = null;
    dataReady = false;

    if (signingIn) return;

    signingIn = true;

    try {
      await signInAnonymously(auth);
      console.log("تم إنشاء حساب مشارك جديد");
    } catch (error) {
      console.error("خطأ في تسجيل الدخول:", error);
    } finally {
      signingIn = false;
    }

    return;
  }

  // استخدام الحساب المحفوظ
  currentUser = user;
  dataReady = false;

  console.log("معرّف المستخدم:", user.uid);

  try {
    await loadHabits();
    await loadUserData(user.uid);

    dataReady = true;

    if (window.getAppState) {
      window.saveUserData(window.getAppState());
    }

    console.log("المزامنة جاهزة");

  } catch (error) {
    console.error("خطأ تجهيز بيانات المستخدم:", error);
  }
});
