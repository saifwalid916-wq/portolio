
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC7EkHR-86_BmS3YSKsh-IiDflyeRK7s1s",
  authDomain: "ramadan-challenge-8b372.firebaseapp.com",
  projectId: "ramadan-challenge-8b372",
  storageBucket: "ramadan-challenge-8b372.firebasestorage.app",
  messagingSenderId: "168524620234",
  appId: "1:168524620234:web:86b1582e748f4bc83a2f33"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export default app;
