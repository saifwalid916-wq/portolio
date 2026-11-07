const N=29,PR=['الفجر','الظهر','العصر','المغرب','العشاء'];
const K=15,EX=['صيام اليوم','التراويح','أذكار الصباح','أذكار المساء','الصدقة'];
let S={name:'',theme:'',day:0,start:'',b:[],z:{},j:'0'.repeat(30),pg:{},q:'0'.repeat(9),p:'0'.repeat(K*N)},wkI=0;
try{Object.assign(S,JSON.parse(localStorage.getItem('rmd1')||'{}'))}catch(e){}
if(typeof S.p==='string'&&S.p.length===290){let q='';for(let d=0;d<N;d++)q+=S.p.slice(d*10,d*10+10)+'00000';S.p=q}
if(typeof S.p==='string'&&S.p.length===406){let q='';for(let d=0;d<N;d++){const o=S.p.slice(d*14,d*14+14);q+=o.slice(0,13)+'0'+o[13]}S.p=q}
if(typeof S.p!=='string'||S.p.length!==K*N)S.p='0'.repeat(K*N);
if(!Array.isArray(S.b))S.b=[];
if(!S.z||typeof S.z!=='object')S.z={};
if(typeof S.j!=='string'||S.j.length!==30)S.j='0'.repeat(30);
if(!S.pg||typeof S.pg!=='object')S.pg={};
if(typeof S.q!=='string'||S.q.length!==9)S.q='0'.repeat(9);
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const save=()=>{try{localStorage.setItem('rmd1',JSON.stringify(S))}catch(e){}};
const g=(d,i)=>S.p[d*K+i]==='1';
const cnt=(d0,d1,a,b)=>{let n=0;for(let d=d0;d<d1;d++)for(let i=a;i<b;i++)if(g(d,i))n++;return n};
const wk=w=>[w*7,w<3?w*7+7:N];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
function msg(p){return p===0?'جاهز يا بطل نبدا التحدي':p<25?'بداية موفقة، كمّل':p<50?'ماشي صح، استمر':p<75?'عدّيت النص، شد حيلك':p<100?'قربت تخلّص، ما تقفش':'ما شاء الله، أتممت التحدي!'}
function tick(el,to,dec,sf){dec=dec||0;sf=sf||'';const f=+el.dataset.v||0;el.dataset.v=to;if(RM){el.textContent=to.toFixed(dec)+sf;return}const t0=performance.now();const st=t=>{const k=Math.min(1,(t-t0)/700);el.textContent=(f+(to-f)*k).toFixed(dec)+sf;if(k<1)requestAnimationFrame(st)};requestAnimationFrame(st)}
let tt;function toast(t){const e=$('#ts');e.textContent=t;e.classList.add('s');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('s'),4500)}
function setTheme(t){S.theme=t;document.documentElement.dataset.theme=t;$('#tg').textContent=t==='dark'?'☀️':'🌙';save()}
function streak(d){let s=0,k=cnt(d,d+1,0,10)===10?d:d-1;for(;k>=0&&cnt(k,k+1,0,10)===10;k--)s++;return s}
const AY=[['وَقُل رَّبِّ زِدْنِي عِلْمًا','طه 114'],['إِنَّ مَعَ الْعُسْرِ يُسْرًا','الشرح 6'],['أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ','الرعد 28'],['إِنَّ اللَّهَ مَعَ الصَّابِرِينَ','البقرة 153'],['وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ','البقرة 45'],['حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ','آل عمران 173'],['رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي','طه 25-26'],['فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي','البقرة 152'],['رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ','البقرة 201'],['رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا','آل عمران 8'],['اللهم إنك عفو تحب العفو فاعف عني','دعاء ليلة القدر'],['لا حول ولا قوة إلا بالله','ذكر'],['سبحان الله وبحمده، سبحان الله العظيم','ذكر'],['وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ','البقرة 186'],['رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي','إبراهيم 40'],['وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا','الطلاق 2'],['وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ','الضحى 5'],['رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ','البقرة 127'],['ادْعُونِي أَسْتَجِبْ لَكُمْ','غافر 60'],['اللهم أعني على ذكرك وشكرك وحسن عبادتك','دعاء']];
function dateFor(d){const b=S.start?new Date(S.start+'T12:00:00'):new Date();b.setHours(12,0,0,0);if(S.start)b.setDate(b.getDate()+d);return b}
function pt(dt){const r=Math.PI/180,la=30.0444*r,Y=dt.getFullYear(),M=dt.getMonth(),D=dt.getDate(),n=Date.UTC(Y,M,D,12)/864e5+2440587.5-2451545;
const L=(280.46+.9856474*n)%360,gm=((357.528+.9856003*n)%360)*r,lm=(L+1.915*Math.sin(gm)+.02*Math.sin(2*gm))*r,ep=(23.439-4e-7*n)*r;
const dc=Math.asin(Math.sin(ep)*Math.sin(lm)),ra=Math.atan2(Math.cos(ep)*Math.sin(lm),Math.cos(lm))/r;
let e=(L-ra)%360;if(e>180)e-=360;if(e<-180)e+=360;const nn=12-31.2357/15-e/15;
const H=a=>Math.acos((Math.sin(a*r)-Math.sin(la)*Math.sin(dc))/(Math.cos(la)*Math.cos(dc)))/r/15;
const as=Math.atan(1/(1+Math.tan(Math.abs(la-dc))))/r;
const A=[nn-H(-19.5),nn+.02,nn+H(as),nn+H(-.833),nn+H(-17.5)];pt.raw=A.map(h=>Date.UTC(Y,M,D)+h*36e5);return A.map(h=>new Date(Date.UTC(Y,M,D)+h*36e5).toLocaleTimeString('ar-EG',{timeZone:'Africa/Cairo',hour:'numeric',minute:'2-digit'}))}
function autoDay(){if(!S.start)return;const d=Math.round((new Date(new Date().toDateString())-new Date(S.start+'T00:00:00'))/864e5);S.day=Math.max(0,Math.min(N-1,d));wkI=Math.min(3,Math.floor(S.day/7));save()}
function extras(){
 const bars=$('#bars');bars.innerHTML='';
 for(let d=0;d<N;d++){const p=cnt(d,d+1,0,10)*10,b=document.createElement('button');b.style.height=Math.max(3,p*.9)+'px';b.title=(d+1)+' رمضان: '+p+'%';b.setAttribute('aria-label',b.title);if(d===S.day)b.className='cur';b.onclick=()=>setDay(d);bars.append(b)}
 let ms=0,s=0,full=0;for(let d=0;d<N;d++){if(cnt(d,d+1,0,10)===10){s++;full++;ms=Math.max(ms,s)}else s=0}
 const tot=(cnt(0,N,0,5)+cnt(0,N,5,10))/290,wkOk=[0,1,2,3].some(w=>{const[a,z]=wk(w);return cnt(a,z,0,5)>=(z-a)*5});
 const B=[['🌙','أول يوم كامل',full>=1],['🔥','٣ أيام متتالية',ms>=3],['⭐','أسبوع كامل متتالي',ms>=7],['🕌','هدف أسبوع الصلاة',wkOk],['📖','نصف الطريق',tot>=.5],['🏆','التحدي كامل',tot>=1]];
 const nw=B.filter(x=>x[2]&&!S.b.includes(x[1]));
 if(nw.length){S.b=S.b.concat(nw.map(x=>x[1]));save();setTimeout(()=>toast('شارة جديدة: '+nw[0][1]),1800)}
 $('#bdg').innerHTML=B.map(x=>'<div class="b'+(x[2]?' on':'')+'"><span>'+x[0]+'</span>'+x[1]+'</div>').join('')
}
const ZB=[['اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ','آية الكرسي، مرة واحدة'],['قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ','سورة الإخلاص، 3 مرات'],['قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ','سورة الفلق، 3 مرات'],['قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَٰهِ النَّاسِ، مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ','سورة الناس، 3 مرات']];
const ZT=[['اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ','سيد الاستغفار، مرة واحدة'],['بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ','3 مرات'],['رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صلى الله عليه وسلم نَبِيًّا','3 مرات'],['حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ','7 مرات'],['سُبْحَانَ اللَّهِ وَبِحَمْدِهِ','100 مرة']];
const ZM=ZB.concat([['أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ','مرة واحدة'],['اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ','مرة واحدة']],ZT);
const ZE=ZB.concat([['أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ','مرة واحدة'],['اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ','مرة واحدة']],ZT,[['أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ','3 مرات']]);
function azr(){
 [['#azs',ZM,'s','أذكار الصباح',12],['#azm',ZE,'m','أذكار المساء',13]].forEach(([id,L,t,nm,ix])=>{
  const c=$(id);c.innerHTML='';const sm=c.previousElementSibling;
  const tg=z=>{const m=z[1].match(/\d+/);return m?+m[0]:1},key=i=>S.day+':'+t+':'+i;
  const head=()=>{let n=0;L.forEach((z,i)=>{if((S.z[key(i)]||0)>=tg(z))n++});sm.textContent=nm+' ('+n+'/'+L.length+')';return n};
  L.forEach((z,i)=>{
   const T=tg(z),d=document.createElement('div');d.className='z';
   const tx=document.createElement('div');tx.textContent=z[0];
   const r=document.createElement('div');r.className='zr';
   const b=document.createElement('button');b.className='tsb';b.setAttribute('aria-label','عدّ '+z[1]);
   const inn=document.createElement('span');inn.className='in';b.append(inn);
   const lb=document.createElement('small');lb.textContent=z[1];
   const rs=document.createElement('button');rs.className='btn o rs';rs.textContent='تصفير';
   const paint=()=>{const v=Math.min(S.z[key(i)]||0,T);inn.textContent=v>=T?'✓':v+'/'+T;b.style.setProperty('--p',v/T*100);b.classList.toggle('done',v>=T)};
   b.onclick=()=>{let v=S.z[key(i)]||0;if(v>=T)return;v++;S.z[key(i)]=v;save();paint();b.classList.add('pop');navigator.vibrate&&navigator.vibrate(v>=T?60:12);
    if(v>=T){const n=head();if(n===L.length&&!g(S.day,ix)){const k=S.day*K+ix;S.p=S.p.slice(0,k)+'1'+S.p.slice(k+1);save();update();toast('تم تسجيل '+nm+' ✓')}}else head()};
   rs.onclick=()=>{delete S.z[key(i)];save();paint();head()};
   paint();r.append(b,lb,rs);d.append(tx,r);c.append(d)});
  head()})
}
const inRm=()=>{const sd=S.start?new Date(S.start+'T00:00:00'):new Date('2027-02-08T00:00:00'),d=Math.round((sd-new Date(new Date().toDateString()))/864e5);return d<=0&&d>-N};
function cdn(){
 const tds=new Date().toDateString();if(cdn.d!==tds){cdn.d=tds;chips();update()}
 const now=Date.now(),t=new Date();t.setHours(12,0,0,0);
 pt(t);const a=pt.raw.slice();t.setDate(t.getDate()+1);pt(t);const f2=pt.raw[0];
 const NM=['الفجر','الظهر','العصر','المغرب','العشاء'],i=a.findIndex(x=>x>now),p=v=>String(v).padStart(2,'0'),f=ms=>{const s=Math.max(0,Math.floor(ms/1e3));return p(Math.floor(s/3600))+':'+p(Math.floor(s%3600/60))+':'+p(s%60)};
 $('#cd1').textContent='الصلاة الجاية: '+(i<0?'الفجر':NM[i]);$('#t1').textContent=f((i<0?f2:a[i])-now);
 const fst=now>=a[0]&&now<a[3];
 $('#cd2').parentElement.hidden=!inRm();$('#cd2').textContent=fst?'باقي على الإفطار':'باقي على الإمساك (الفجر)';$('#t2').textContent=f((fst?a[3]:now<a[0]?a[0]:f2)-now);
 const sd=S.start?new Date(S.start+'T00:00:00'):new Date('2027-02-08T00:00:00'),dd=Math.round((sd-new Date(new Date().toDateString()))/864e5),c3=$('#cd3'),t3=$('#t3');
 if(dd>0){c3.textContent='فاضل على رمضان'+(S.start?'':' (تقريباً)');t3.textContent=dd+' يوم'}
 else if(dd===0){c3.textContent='رمضان كريم';t3.textContent='النهاردة'}
 else if(dd>-N){c3.textContent='أنت في رمضان';t3.textContent='يوم '+(1-dd)+' من 29'}
 else{c3.textContent='رمضان خلّص';t3.textContent='تقبّل الله'}
}
function kh(){
 const c=$('#jz');
 if(!c.children.length)for(let i=0;i<30;i++){const b=document.createElement('button');b.className='jb';b.textContent=i+1;b.setAttribute('aria-label','الجزء '+(i+1));b.onclick=()=>{S.j=S.j.slice(0,i)+(S.j[i]==='1'?'0':'1')+S.j.slice(i+1);save();b.classList.add('pop');update()};c.append(b)}
 [...c.children].forEach((b,i)=>b.classList.toggle('on',S.j[i]==='1'));
 const tp=Object.values(S.pg).reduce((a,v)=>a+(+v||0),0);
 $('#jt').textContent=(S.j.match(/1/g)||[]).length+' من 30 جزء، وقرأت '+tp+' صفحة من 604';
 $('#jp').style.width=Math.min(100,tp/604*100)+'%';
 const pi=$('#pgi');if(document.activeElement!==pi)pi.value=S.pg[S.day]||'';
 $('#pgl').textContent='صفحات '+(S.day+1)+' رمضان'
}
function ln(){
 const s=$('#ln');s.hidden=S.day<20;if(S.day<20)return;
 const c=$('#qn');
 if(!c.children.length)for(let n=21;n<=29;n++){const i=n-21,b=document.createElement('button');b.className='qb'+(n%2?' odd':'');const a=document.createElement('b'),t=document.createElement('small');a.textContent='ليلة '+n;t.textContent=n%2?'وترية':'شفعية';b.append(a,t);b.onclick=()=>{S.q=S.q.slice(0,i)+(S.q[i]==='1'?'0':'1')+S.q.slice(i+1);save();b.classList.add('pop');ln()};c.append(b)}
 [...c.children].forEach((b,i)=>b.classList.toggle('on',S.q[i]==='1'));
 const t=[...S.q].filter(x=>x==='1').length,o=[0,2,4,6,8].filter(i=>S.q[i]==='1').length;
 $('#qt').textContent='قمت '+t+' ليلة من 9، منها '+o+' من الليالي الوترية'
}
let ayI=(()=>{let i;do{i=Math.floor(Math.random()*AY.length)}while(i===S.ayl);S.ayl=i;save();return i})();
let repText='';
function report(){
 const d=S.day,a=cnt(d,d+1,0,5),b=cnt(d,d+1,5,10),[w0,w1]=wk(Math.min(3,Math.floor(d/7)));
 const wp=cnt(w0,w1,0,5),ww=cnt(w0,w1,5,10),P=cnt(0,N,0,5),W=cnt(0,N,5,10),pct=(a+b)*10,tot=Math.round((P+W)/290*100);
 const det=(o)=>PR.map((n,i)=>n+' '+(g(d,o+i)?'✓':'✗')).join('، ');
 const line=[
  ['تقرير تحدي رمضان - يوم '+(d+1)+(S.name?' - '+S.name:''),''],
  ['الصلوات: ',a+' من 5 ('+det(0)+')'],
  ['الورد: ',b+' من 5 ('+det(5)+')'],
  ['أعمال صالحة: ',cnt(d,d+1,10,15)+' من 5 ('+EX.map((n,i)=>n+' '+(g(d,10+i)?'✓':'✗')).join('، ')+')'],
  ['الصفحات المقروءة: ',(S.pg[d]||0)+' صفحة'],
  ['إنجاز اليوم: ',pct+'%'],
  ['الأسبوع: ',wp+' من '+(w1-w0)*5+' صلاة، '+ww+' من '+(w1-w0)*5+' ورد'],
  ['الإجمالي: ',P+' من 145 صلاة، '+(W*30/145).toFixed(1)+' من 30 جزء ('+tot+'%)'],
  ['أيام متتالية كاملة: ',String(streak(d))],
  [pct===100?'ما شاء الله، يوم كامل. ربنا يتقبل منك':pct>=50?'شد حيلك، فاضل القليل النهارده':'لسه فيه وقت تكمل يومك، يلا',''] ];
 repText=line.map(l=>l[0]+l[1]).join('\n');
 const e=$('#rep');e.innerHTML='';
 const mk=(t,c,x)=>{const n=document.createElement(t);if(c)n.className=c;if(x!=null)n.textContent=x;return n};
 const hd=mk('div','rh');const bw=mk('span','rb');bw.append(mk('span','rp rf','🔥 '+streak(d)),mk('span','rp',pct+'%'));hd.append(mk('b','','يوم '+(d+1)+' رمضان'+(S.name?' - '+S.name:'')),bw);
 const bar=mk('div','pb rbar'),bi=mk('i');bi.style.width=pct+'%';bar.append(bi);
 const grid=mk('div','rg');
 const tile=(nm,o,Ls,n)=>{const t=mk('div','rt'),top=mk('div','rtt'),ds=mk('div','rd'),ms=Ls.filter((x,i)=>!g(d,o+i));top.append(mk('span','',nm),mk('b','',n+'/5'));Ls.forEach((x,i)=>{const dt=mk('i',g(d,o+i)?'on':'');dt.title=x;dt.setAttribute('aria-label',x+(g(d,o+i)?' تم':' لم يتم'));ds.append(dt)});t.append(top,ds,mk('small','',ms.length===0?'مكتمل ✓':ms.length===Ls.length?'لسه ما بدأت':'ناقص: '+ms.join('، ')));return t};
 grid.append(tile('الصلوات',0,PR,a),tile('الورد',5,PR,b),tile('أعمال صالحة',10,EX,cnt(d,d+1,10,15)));
 const pgt=mk('div','rt'),pgh=mk('div','rtt');pgh.append(mk('span','','الصفحات'),mk('b','',String(S.pg[d]||0)));pgt.append(pgh,mk('small','','من 604 للختمة كلها'));grid.append(pgt);
 const sb=mk('div','rs');
 [['الأسبوع',wp+'/'+(w1-w0)*5+' صلاة، '+ww+'/'+(w1-w0)*5+' ورد'],['الإجمالي',P+'/145 صلاة، '+(W*30/145).toFixed(1)+'/30 جزء']].forEach(([k,v])=>{const c=mk('div','rc');c.append(mk('small','',k),mk('b','',v));sb.append(c)});
 e.append(hd,bar,grid,sb,mk('p','rm',line[line.length-1][0]))
}
function chips(){
 const T=pt(new Date());
 [['#g1',0,PR],['#g2',5,PR],['#g3',10,EX]].forEach(([s,o,Ls])=>{const c=$(s);c.innerHTML='';Ls.forEach((n,i)=>{const b=document.createElement('button');b.className='chip c2 c';b.dataset.d=S.day;b.dataset.i=o+i;b.style.width='auto';b.style.height='auto';b.textContent=n+(o===0?' '+T[i]:'');b.setAttribute('aria-pressed','false');c.append(b)})});
 $('#ayt').textContent=AY[ayI][0];$('#ays').textContent=AY[ayI][1];azr();
 $('#ift').textContent='مواقيت اليوم '+new Date().toLocaleDateString('ar-EG',{day:'numeric',month:'long'})+' بتوقيت القاهرة (تقريبية)';const fb=$('#ifb');fb.hidden=!inRm();fb.textContent='🌙 الإفطار '+T[3]+'، والإمساك '+T[0];
}
function table(){
 const [a,z]=wk(wkI),t=$('#tb');let h='<tr><th></th>';
 for(let d=a;d<z;d++)h+='<th class="'+(d===S.day?'tdy':'')+'">'+(d+1)+'</th>';
 h+='</tr>';
 [['الصلوات',0,PR],['القراءة',5,PR],['أعمال صالحة',10,EX]].forEach(([sec,o,Ls])=>{
  h+='<tr class="sec"><td colspan="'+(z-a+1)+'">'+sec+'</td></tr>';
  Ls.forEach((n,i)=>{h+='<tr><td>'+(o===5?'ورد ':'')+n+'</td>';for(let d=a;d<z;d++)h+='<td class="'+(d===S.day?'tdy':'')+'"><button class="c" data-d="'+d+'" data-i="'+(o+i)+'" aria-label="'+(d+1)+' رمضان - '+n+'"></button></td>';h+='</tr>'})});
 t.innerHTML=h;
 const p=cnt(a,z,0,5),r=cnt(a,z,5,10),m=(z-a)*5;
 $('#goals').innerHTML=[['هدف الأسبوع - الصلاة',p],['هدف الأسبوع - القراءة',r]].map(x=>'<div class="g"><div style="display:flex;justify-content:space-between"><span>'+x[0]+'</span><span>'+x[1]+' / '+m+'</span></div><div class="pb"><i style="width:'+x[1]/m*100+'%"></i></div><span class="'+(x[1]>=m?'ok':'no')+'">'+(x[1]>=m?'تم الوصول':'لم يتم الوصول')+'</span></div>').join('');
 $$('.tab').forEach((b,i)=>b.setAttribute('aria-selected',i===wkI))
}
function update(){
 const P=cnt(0,N,0,5),W=cnt(0,N,5,10),jz=(S.j.match(/1/g)||[]).length,PA=Math.max(W*30/145,jz),pp=Math.round(P/145*100),qp=Math.round(PA/30*100),tot=Math.round((P+W)/290*100);
 tick($('#sp'),P);tick($('#sq'),PA,1);tick($('#tp'),tot,0,'%');
 $('#bp').style.width=pp+'%';$('#bq').style.width=qp+'%';$('#rg').style.strokeDashoffset=326.7*(1-tot/100);
 $('#mp').textContent=msg(pp);$('#mq').textContent=msg(qp);
 $$('.c').forEach(b=>{const on=g(+b.dataset.d,+b.dataset.i);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
 $('#dl').textContent=(S.day+1)+' رمضان';$('#dp').textContent='إنجاز اليوم '+cnt(S.day,S.day+1,0,10)*10+'%';
 report();table();$$('.c').forEach(b=>b.classList.toggle('on',g(+b.dataset.d,+b.dataset.i)));extras();kh();ln();
}
function setDay(d){S.day=Math.max(0,Math.min(N-1,d));wkI=Math.min(3,Math.floor(S.day/7));save();chips();update()}
function greet(first){
 $('#hi').textContent=S.name?'أهلاً يا '+S.name:'';
 if(S.name)toast(first?'أهلاً بيك يا '+S.name+'، رمضان كريم! ربنا يتقبل منك الصيام والقيام':'نورت يا '+S.name+'، كمّل تحديك النهاردة')
}
document.addEventListener('click',e=>{
 const b=e.target.closest('.c');if(!b)return;
 const d=+b.dataset.d,i=+b.dataset.i,k=d*K+i,was=cnt(d,d+1,0,10)===10;
 S.p=S.p.slice(0,k)+(g(d,i)?'0':'1')+S.p.slice(k+1);save();
 const dl=$('#dl').textContent;b.classList.add('pop');update();
 $$('.c').forEach(x=>{if(x.dataset.d==d&&x.dataset.i==i)x.classList.add('pop')});
 if(!was&&cnt(d,d+1,0,10)===10)toast('ما شاء الله! أتممت يوم '+(d+1)+' كامل 🌙');
});
document.addEventListener('animationend',e=>e.target.classList&&e.target.classList.remove('pop'));
$('#nx').onclick=()=>setDay(S.day+1);$('#pv').onclick=()=>setDay(S.day-1);
$('#tg').onclick=()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark');
$('#nm').onclick=()=>{$('#ni').value=S.name;$('#wl').classList.add('s');$('#ni').focus()};
function enter(){const v=$('#ni').value.trim();if(!v){$('#ni').focus();return}S.name=v;save();$('#wl').classList.remove('s');greet(true)}
$('#go').onclick=enter;$('#ni').onkeydown=e=>{if(e.key==='Enter')enter()};
$('#cp').onclick=async()=>{try{await navigator.clipboard.writeText(repText)}catch(e){const t=document.createElement('textarea');t.value=repText;document.body.append(t);t.select();try{document.execCommand('copy')}catch(x){}t.remove()}toast('تم نسخ التقرير')};
if(navigator.share){$('#sh').hidden=false;$('#sh').onclick=()=>navigator.share({text:repText}).catch(()=>{})}
$('#tabs').innerHTML=['الأسبوع الأول','الأسبوع الثاني','الأسبوع الثالث','الأسبوع الرابع'].map((t,i)=>'<button class="tab" role="tab" data-w="'+i+'">'+t+'</button>').join('');
$('#tabs').onclick=e=>{const b=e.target.closest('.tab');if(b){wkI=+b.dataset.w;table();update()}};
const hr=$('.hero');for(let i=0;i<30;i++){const s=document.createElement('i');s.className='star';s.style.cssText='left:'+Math.random()*100+'%;top:'+Math.random()*100+'%;animation-delay:'+Math.random()*3+'s';hr.append(s)}
setTheme(S.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'));
S.day=Math.max(0,Math.min(N-1,+S.day||0));wkI=Math.min(3,Math.floor(S.day/7));
$('#sd').value=S.start||'';
$('#sd').onchange=()=>{S.start=$('#sd').value;save();autoDay();chips();update();toast('تم ضبط أول يوم في رمضان')};
$('#ex').onclick=async()=>{const t=JSON.stringify(S);$('#bk').value=t;try{await navigator.clipboard.writeText(t)}catch(e){$('#bk').select()}toast('تم نسخ النسخة الاحتياطية، احفظها في مكان آمن')};
$('#im').onclick=()=>{try{const o=JSON.parse($('#bk').value);if(typeof o.p!=='string'||o.p.length!==K*N)throw 0;S=Object.assign(S,o);save();setTheme(S.theme||'dark');$('#sd').value=S.start||'';$('#hi').textContent=S.name?'أهلاً يا '+S.name:'';setDay(S.day);toast('تم استرجاع التقدّم')}catch(e){toast('النسخة غير صالحة، انسخها كاملة وجرّب تاني')}};
$('#pgi').oninput=()=>{const v=Math.max(0,Math.min(604,Math.floor(+$('#pgi').value||0)));if(v)S.pg[S.day]=v;else delete S.pg[S.day];save();kh();report()};
function ayR(){let i;do{i=Math.floor(Math.random()*AY.length)}while(i===ayI);ayI=i;S.ayl=i;save();const p=$('#ayt'),s=$('#ays');p.style.opacity=0;s.style.opacity=0;setTimeout(()=>{p.textContent=AY[i][0];s.textContent=AY[i][1];p.style.opacity=1;s.style.opacity=1},500)}
setInterval(ayR,45000);
autoDay();chips();update();cdn();setInterval(cdn,1000);
if(S.name)setTimeout(()=>greet(false),500);else $('#wl').classList.add('s');
