// مزامنة اختيارية مع Firebase: بتشتغل بس لو المستخدم وافق على مشاركة اسمه وتقدّمه.
import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {getAuth,signInAnonymously} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {getFirestore,doc,setDoc,deleteDoc,serverTimestamp} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseConfig={
  apiKey:"AIzaSyC7EkHR-86_BmS3YSKsh-IiDflyeRK7s1s",
  authDomain:"ramadan-challenge-8b372.firebaseapp.com",
  projectId:"ramadan-challenge-8b372",
  storageBucket:"ramadan-challenge-8b372.firebasestorage.app",
  messagingSenderId:"168524620234",
  appId:"1:168524620234:web:86b1582e748f4bc83a2f33"
};

let db=null,uid=null,timer=null,busy=false;
async function ready(){
  if(db&&uid)return;
  const app=initializeApp(firebaseConfig),auth=getAuth(app);
  db=getFirestore(app);
  const c=await signInAnonymously(auth);uid=c.user.uid;
}
async function push(){
  const A=window.RMAPI;if(!A||busy)return;
  const S=A.state();if(!S.share||!S.name||!navigator.onLine)return;
  busy=true;
  try{
    await ready();
    await setDoc(doc(db,'users',uid),Object.assign(A.snapshot(),{consent:true,lastSeen:serverTimestamp()}),{merge:true});
  }catch(e){console.warn('sync failed',e)}
  busy=false;
}
function later(ms){clearTimeout(timer);timer=setTimeout(push,ms)}
window.addEventListener('rm-save',()=>later(5000));
window.addEventListener('rm-share',()=>later(500));
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')push()});
window.RMSync={push,remove:async()=>{await ready();await deleteDoc(doc(db,'users',uid))}};
later(2500);
