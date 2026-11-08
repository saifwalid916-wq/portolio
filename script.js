const N=29,PR=['الفجر','الظهر','العصر','المغرب','العشاء'];
const K=15,EX=['صيام اليوم','التراويح','أذكار الصباح','أذكار المساء','الصدقة'];
let S={name:'',theme:'',day:0,start:'',snd:false,city:'cairo',b:[],z:{},j:'0'.repeat(30),pg:{},q:'0'.repeat(9),p:'0'.repeat(K*N)},wkI=0;
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
const CTS={cairo:{n:'القاهرة',la:30.0444,lg:31.2357},giza:{n:'الجيزة',la:30.0131,lg:31.2089},alex:{n:'الإسكندرية',la:31.2001,lg:29.9187},qalyubia:{n:'القليوبية (بنها)',la:30.466,lg:31.1848},sharqia:{n:'الشرقية (الزقازيق)',la:30.5877,lg:31.502},dakahlia:{n:'الدقهلية (المنصورة)',la:31.0409,lg:31.3785},gharbia:{n:'الغربية (طنطا)',la:30.7865,lg:31.0004},menoufia:{n:'المنوفية (شبين الكوم)',la:30.5972,lg:30.9876},beheira:{n:'البحيرة (دمنهور)',la:31.0341,lg:30.4682},kafr:{n:'كفر الشيخ',la:31.1107,lg:30.9388},damietta:{n:'دمياط',la:31.4165,lg:31.8133},portsaid:{n:'بورسعيد',la:31.2653,lg:32.3019},ismailia:{n:'الإسماعيلية',la:30.5965,lg:32.2715},suez:{n:'السويس',la:29.9668,lg:32.5498},northsinai:{n:'شمال سيناء (العريش)',la:31.1316,lg:33.7984},southsinai:{n:'جنوب سيناء (شرم الشيخ)',la:27.9158,lg:34.33},fayoum:{n:'الفيوم',la:29.3084,lg:30.8428},beni:{n:'بني سويف',la:29.0661,lg:31.0994},minya:{n:'المنيا',la:28.0871,lg:30.7618},assiut:{n:'أسيوط',la:27.1783,lg:31.1859},sohag:{n:'سوهاج',la:26.5569,lg:31.6948},qena:{n:'قنا',la:26.1551,lg:32.716},luxor:{n:'الأقصر',la:25.6872,lg:32.6396},aswan:{n:'أسوان',la:24.0889,lg:32.8998},redsea:{n:'البحر الأحمر (الغردقة)',la:27.2579,lg:33.8116},matrouh:{n:'مطروح',la:31.3543,lg:27.2373},newvalley:{n:'الوادي الجديد (الخارجة)',la:25.4519,lg:30.5464}},cy=()=>CTS[S.city]||CTS.cairo;
function pt(dt){const r=Math.PI/180,la=cy().la*r,Y=dt.getFullYear(),M=dt.getMonth(),D=dt.getDate(),n=Date.UTC(Y,M,D,12)/864e5+2440587.5-2451545;
const L=(280.46+.9856474*n)%360,gm=((357.528+.9856003*n)%360)*r,lm=(L+1.915*Math.sin(gm)+.02*Math.sin(2*gm))*r,ep=(23.439-4e-7*n)*r;
const dc=Math.asin(Math.sin(ep)*Math.sin(lm)),ra=Math.atan2(Math.cos(ep)*Math.sin(lm),Math.cos(lm))/r;
let e=(L-ra)%360;if(e>180)e-=360;if(e<-180)e+=360;const nn=12-cy().lg/15-e/15;
const H=a=>Math.acos((Math.sin(a*r)-Math.sin(la)*Math.sin(dc))/(Math.cos(la)*Math.cos(dc)))/r/15;
const as=Math.atan(1/(1+Math.tan(Math.abs(la-dc))))/r;
const A=[nn-H(-19.5),nn+.02,nn+H(as),nn+H(-.833),nn+H(-17.5)];pt.raw=A.map(h=>Date.UTC(Y,M,D)+h*36e5);return A.map(h=>new Date(Date.UTC(Y,M,D)+h*36e5).toLocaleTimeString('ar-EG',{timeZone:'Africa/Cairo',hour:'numeric',minute:'2-digit'}))}
function hij(d){hij.f=hij.f||new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn',{day:'numeric',month:'numeric',year:'numeric'});const o={};hij.f.formatToParts(d).forEach(x=>o[x.type]=+x.value);return o}
function rmStart(){const k=new Date().toDateString();if(rmStart.k===k)return rmStart.v;const t=new Date();t.setHours(12,0,0,0);let v=null;
 try{const h=hij(t);if(h.month===9){v=new Date(t);v.setDate(v.getDate()-(h.day-1))}else for(let i=1;i<=400;i++){const x=new Date(t);x.setDate(x.getDate()+i);const q=hij(x);if(q.month===9&&q.day===1){v=x;break}}}catch(e){}
 if(!v)v=new Date(2027,1,8,12);v.setHours(0,0,0,0);rmStart.k=k;rmStart.v=v;return v}
function autoDay(){const d=Math.round((new Date(new Date().toDateString())-rmStart())/864e5);S.day=Math.max(0,Math.min(N-1,d));wkI=Math.min(3,Math.floor(S.day/7));save()}
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
const inRm=()=>{const d=Math.round((rmStart()-new Date(new Date().toDateString()))/864e5);return d<=0&&d>-N};
let AC=null;
function beep(){if(!AC)return;try{const t0=AC.currentTime;[523,659,784,659,523,784].forEach((fq,i)=>{const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=fq;g.gain.setValueAtTime(0,t0+i*.4);g.gain.linearRampToValueAtTime(.25,t0+i*.4+.05);g.gain.linearRampToValueAtTime(0,t0+i*.4+.38);o.connect(g);g.connect(AC.destination);o.start(t0+i*.4);o.stop(t0+i*.4+.4)})}catch(e){}}
function cdn(){
 const tds=new Date().toDateString();if(cdn.d!==tds){cdn.d=tds;chips();update()}
 const D=new Date(),now=D.getTime(),t=new Date();t.setHours(12,0,0,0);
 const F0=pt(t),a=pt.raw.slice();t.setDate(t.getDate()+1);const F1=pt(t),f2=pt.raw[0];t.setDate(t.getDate()-2);pt(t);const y4=pt.raw[4];
 const NM=['الفجر','الظهر','العصر','المغرب','العشاء'],p=v=>String(v).padStart(2,'0'),f=ms=>{const s=Math.max(0,Math.floor(ms/1e3));return p(Math.floor(s/3600))+':'+p(Math.floor(s%3600/60))+':'+p(s%60)};
 const i=a.findIndex(x=>x>now),ni=i<0?0:i,nx=i<0?f2:a[i],pv=i<0?a[4]:i===0?y4:a[i-1];
 if(cdn.n!==undefined&&cdn.n!==nx){toast('حان الآن وقت '+NM[(ni+4)%5]);if(S.snd)beep()}
 cdn.n=nx;
 $('#npn').textContent=NM[ni];$('#npt').textContent=(i<0?F1:F0)[ni];$('#t1').textContent=f(nx-now);
 $('#npb').style.width=Math.max(0,Math.min(100,(now-pv)/(nx-pv)*100))+'%';
 $('#np').classList.toggle('urg',nx-now<6e5);
 const tl=$('#tl');
 if(!tl.children.length){NM.forEach(n=>{const k=document.createElement('i');k.className='tk';const l=document.createElement('div');l.className='tkl';l.append(n,document.createElement('small'));tl.append(k,l)});const w=document.createElement('i');w.className='now';tl.append(w)}
 NM.forEach((n,k)=>{const ps=k*25,m=tl.children[k*2],l=tl.children[k*2+1];m.style.right=ps+'%';l.style.right=ps+'%';m.classList.toggle('pass',now>=a[k]);l.lastChild.textContent=F0[k]});
 let pn=0;if(now>=a[4])pn=100;else if(now>a[0]){const j=a.findIndex((x,q)=>q<4&&now>=x&&now<a[q+1]);pn=j*25+(now-a[j])/(a[j+1]-a[j])*25}
 tl.lastChild.style.right=pn+'%';
 const rm=inRm();$('#ifx').hidden=!rm;
 if(rm){const fst=now>=a[0]&&now<a[3];$('#cd2').textContent=fst?'باقي على الإفطار':'باقي على الإمساك';$('#t2').textContent=f((fst?a[3]:now<a[0]?a[0]:f2)-now);$('#ifl').textContent='الإفطار '+F0[3]+'\nالإمساك '+F0[0]}
 let hj='';try{cdn.h=cdn.h||new Intl.DateTimeFormat('ar-EG-u-ca-islamic-umalqura',{day:'numeric',month:'long',year:'numeric'});hj=cdn.h.format(D)}catch(e){}
 $('#ckd').textContent=D.toLocaleDateString('ar-EG',{weekday:'long',day:'numeric',month:'long'})+(hj?' - '+hj+' (تقريبي)':'');
 $('#ckn').textContent='الآن '+D.toLocaleTimeString('ar-EG',{timeZone:'Africa/Cairo',hour:'numeric',minute:'2-digit'});
 const dd=Math.round((rmStart()-new Date(new Date().toDateString()))/864e5);
 $('#rmb').textContent=dd>0?'فاضل على رمضان '+dd+' يوم'+' (تقريباً)':dd===0?'رمضان كريم، النهارده أول يوم':dd>-N?'أنت في رمضان، يوم '+(1-dd)+' من 29':'رمضان خلّص، تقبّل الله'
}
const SU=[['الفاتحة',1],['البقرة',2],['آل عمران',50],['النساء',77],['المائدة',106],['الأنعام',128],['الأعراف',151],['الأنفال',177],['التوبة',187],['يونس',208],['هود',221],['يوسف',235],['الرعد',249],['إبراهيم',255],['الحجر',262],['النحل',267],['الإسراء',282],['الكهف',293],['مريم',305],['طه',312],['الأنبياء',322],['الحج',332],['المؤمنون',342],['النور',350],['الفرقان',359],['الشعراء',367],['النمل',377],['القصص',385],['العنكبوت',396],['الروم',404],['لقمان',411],['السجدة',415],['الأحزاب',418],['سبأ',428],['فاطر',434],['يس',440],['الصافات',446],['ص',453],['الزمر',458],['غافر',467],['فصلت',477],['الشورى',483],['الزخرف',489],['الدخان',496],['الجاثية',499],['الأحقاف',502],['محمد',507],['الفتح',511],['الحجرات',515],['ق',518],['الذاريات',520],['الطور',523],['النجم',526],['القمر',528],['الرحمن',531],['الواقعة',534],['الحديد',537],['المجادلة',542],['الحشر',545],['الممتحنة',549],['الصف',551],['الجمعة',553],['المنافقون',554],['التغابن',556],['الطلاق',558],['التحريم',560],['الملك',562],['القلم',564],['الحاقة',566],['المعارج',568],['نوح',570],['الجن',572],['المزمل',574],['المدثر',575],['القيامة',577],['الإنسان',578],['المرسلات',580],['النبأ',582],['النازعات',583],['عبس',585],['التكوير',586],['الانفطار',587],['المطففين',587],['الانشقاق',589],['البروج',590],['الطارق',591],['الأعلى',591],['الغاشية',592],['الفجر',593],['البلد',594],['الشمس',595],['الليل',595],['الضحى',596],['الشرح',596],['التين',597],['العلق',597],['القدر',598],['البينة',598],['الزلزلة',599],['العاديات',599],['القارعة',600],['التكاثر',600],['العصر',601],['الهمزة',601],['الفيل',601],['قريش',602],['الماعون',602],['الكوثر',602],['الكافرون',603],['النصر',603],['المسد',603],['الإخلاص',604],['الفلق',604],['الناس',604]],JST=[1, 22, 42, 62, 82, 102, 121, 142, 162, 182, 201, 222, 242, 262, 282, 302, 322, 342, 362, 382, 402, 422, 442, 462, 482, 502, 522, 542, 562, 582],JE=JST.map((x,i)=>i<29?JST[i+1]-1:604);
const tpg=()=>Object.values(S.pg).reduce((a,v)=>a+(+v||0),0);
const jDone=i=>S.j[i]==='1'||tpg()>=JE[i];
const JP=i=>JE[i]-JST[i]+1;
let jSel=-1;
const effP=()=>{let t=0;for(let i=0;i<30;i++)if(jDone(i))t+=JP(i);return Math.max(tpg(),t)};
const jCnt=()=>{let n=0;for(let i=0;i<30;i++)if(jDone(i))n++;return n};
const sAt=p=>{let r=SU[0][0];for(const x of SU)if(x[1]<=p)r=x[0];return r};
const sBeg=p=>p<=1?SU[0][0]:sAt(p-1);
const jAt=p=>{let r=1;JST.forEach((x,i)=>{if(x<=p)r=i+1});return r};
function kh(){
 const c=$('#jz');
 if(!c.children.length)for(let i=0;i<30;i++){const b=document.createElement('button');b.className='jb';b.textContent=i+1;b.setAttribute('aria-label','الجزء '+(i+1));b.onclick=()=>{jSel=i;if(tpg()<JE[i]){S.j=S.j.slice(0,i)+(S.j[i]==='1'?'0':'1')+S.j.slice(i+1);save();b.classList.add('pop')}update()};c.append(b)}
 [...c.children].forEach((b,i)=>{b.classList.toggle('on',jDone(i));b.classList.toggle('sel',i===jSel)});
 const tp=tpg(),cp=Math.min(604,tp),ep=effP();
 $('#jinfo').textContent=jSel<0?'':(()=>{const x=sAt(JST[jSel]),y=sAt(JE[jSel]);return 'الجزء '+(jSel+1)+': من صفحة '+JST[jSel]+' إلى صفحة '+JE[jSel]+' ('+JP(jSel)+' صفحة)، '+(x===y?'سورة '+x:'من سورة '+x+' إلى سورة '+y)+(jDone(jSel)?' ✓ مكتمل':'')})();
 $('#jt').textContent=jCnt()+' من 30 جزء، وقرأت '+ep+' صفحة من 604';
 $('#jp').style.width=Math.min(100,ep/604*100)+'%';
 $('#jpos').textContent=tp>0?'وصلت لصفحة '+cp+': سورة '+sAt(cp)+'، الجزء '+jAt(cp):'اكتب صفحاتك هنا وهيظهر لك اسم السورة والجزء';
 const td=+S.pg[S.day]||0,bf=Object.keys(S.pg).filter(k=>+k<S.day).reduce((a,k)=>a+(+S.pg[k]||0),0),a1=Math.min(604,bf+1),b1=Math.min(604,bf+td);
 $('#jtd').textContent=td>0?'النهارده: من صفحة '+a1+' (سورة '+sBeg(a1)+') إلى صفحة '+b1+' (سورة '+sAt(b1)+')':'';
 const pi=$('#pgi');if(document.activeElement!==pi)pi.value=S.pg[S.day]||'';
 $('#pgl').textContent='صفحات '+(S.day+1)+' رمضان'
}
const mk=(t,c,x)=>{const n=document.createElement(t);if(c)n.className=c;if(x!=null)n.textContent=x;return n};
async function copyTxt(t){try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.append(a);a.select();try{document.execCommand('copy')}catch(x){}a.remove()}toast('تم نسخ التقرير')}
let wrT='';
function wr(){
 const [a,z]=wk(wkI),e=$('#wrep');e.innerHTML='';
 const n=z-a,lim=Math.min(z-1,S.day),pc=d=>cnt(d,d+1,0,10)*10;
 const P=cnt(a,z,0,5),W=cnt(a,z,5,10),X=cnt(a,z,10,15);let pgs=0;for(let d=a;d<z;d++)pgs+=+S.pg[d]||0;
 let best=null,worst=null,full=0;for(let d=a;d<=lim;d++){if(best===null||pc(d)>pc(best))best=d;if(worst===null||pc(d)<pc(worst))worst=d;if(pc(d)===100)full++}
 const dn=d=>d===null?'-':'يوم '+(d+1)+' ('+pc(d)+'%)',pct=Math.round((P+W)/(n*10)*100),ds=lim<a?0:lim-a+1;
 const hd=mk('div','rh'),bw=mk('span','rb');bw.append(mk('span','rp',pct+'%'));hd.append(mk('b','','تقرير الأسبوع '+(wkI+1)+' (من يوم '+(a+1)+' إلى '+z+')'),bw);
 const bar=mk('div','pb rbar'),bi=mk('i');bi.style.width=pct+'%';bar.append(bi);
 const t=(k,v)=>{const d=mk('div','rt'),h=mk('div','rtt');h.append(mk('span','',k),mk('b','',v));d.append(h);return d};
 const g=mk('div','rg');g.append(t('الصلوات',P+'/'+n*5),t('الورد',W+'/'+n*5),t('أعمال صالحة',X+'/'+n*5),t('الصفحات',String(pgs)));
 const sb=mk('div','rs');[['أحسن يوم',dn(best)],['أضعف يوم',dn(worst)],['أيام كاملة',full+'/'+ds]].forEach(([k,v])=>{const c=mk('div','rc');c.append(mk('small','',k),mk('b','',v));sb.append(c)});
 wrT=['تقرير تحدي رمضان - الأسبوع '+(wkI+1)+(S.name?' - '+S.name:''),'الصلوات: '+P+' من '+n*5,'الورد: '+W+' من '+n*5,'أعمال صالحة: '+X+' من '+n*5,'الصفحات: '+pgs,'أحسن يوم: '+dn(best),'أضعف يوم: '+dn(worst),'أيام كاملة: '+full+' من '+ds].join('\n');
 const cb=mk('button','btn o','نسخ تقرير الأسبوع');cb.style.marginTop='10px';cb.onclick=()=>copyTxt(wrT);
 e.append(hd,bar,g,sb);if(lim<a)e.append(mk('p','rm','الأسبوع ده لسه ما بدأ'));e.append(cb)
}
function cardCanvas(){
 const W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
 const gr=x.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#0e1f16');gr.addColorStop(1,'#050d09');x.fillStyle=gr;x.fillRect(0,0,W,H);
 let sd=7;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647;
 for(let i=0;i<70;i++){x.globalAlpha=.15+rnd()*.5;x.fillStyle='#f3ead2';x.beginPath();x.arc(rnd()*W,rnd()*H,1+rnd()*2.5,0,7);x.fill()}x.globalAlpha=1;
 const P=cnt(0,N,0,5),V=cnt(0,N,5,10),PA=Math.max(V*30/145,jCnt()),tot=Math.round((P+V)/290*100),sk=streak(S.day);
 x.direction='rtl';x.textAlign='center';
 x.fillStyle='#d9b04a';x.beginPath();x.arc(W/2,170,72,0,7);x.fill();x.fillStyle='#0d1d15';x.beginPath();x.arc(W/2+32,148,64,0,7);x.fill();
 x.fillStyle='#f3ead2';x.font='700 88px Tahoma,Arial,sans-serif';x.fillText('تحدي رمضان',W/2,330);
 x.fillStyle='#d9b04a';x.font='500 46px Tahoma,Arial,sans-serif';x.fillText('يوم '+(S.day+1)+' من 29',W/2,400);
 if(S.name){x.fillStyle='#f3ead2';x.font='700 56px Tahoma,Arial,sans-serif';x.fillText(S.name,W/2,478)}
 x.lineWidth=36;x.strokeStyle='#ffffff22';x.beginPath();x.arc(W/2,700,190,0,7);x.stroke();
 x.strokeStyle='#d9b04a';x.lineCap='round';x.beginPath();x.arc(W/2,700,190,-Math.PI/2,-Math.PI/2+Math.PI*2*Math.max(.005,tot/100));x.stroke();
 x.fillStyle='#f3ead2';x.font='700 120px Tahoma,Arial,sans-serif';x.fillText(tot+'%',W/2,728);
 x.fillStyle='#9db3a5';x.font='400 36px Tahoma,Arial,sans-serif';x.fillText('الإنجاز الكلي',W/2,790);
 const B=[['الصلوات',P+'/145'],['الأجزاء',(PA%1?PA.toFixed(1):PA)+'/30'],['الصفحات',String(tpg())],['🔥 أيام متتالية',String(sk)]];
 B.forEach((b,i)=>{const bx=i%2?80:560,by=960+Math.floor(i/2)*170;x.fillStyle='#ffffff12';x.strokeStyle='#ffffff30';x.lineWidth=2;x.beginPath();(x.roundRect?x.roundRect(bx,by,440,140,28):x.rect(bx,by,440,140));x.fill();x.stroke();
  x.fillStyle='#9db3a5';x.font='400 34px Tahoma,Arial,sans-serif';x.fillText(b[0],bx+220,by+48);x.fillStyle='#d9b04a';x.font='700 62px Tahoma,Arial,sans-serif';x.fillText(b[1],bx+220,by+114)});
 x.fillStyle='#9db3a5';x.font='400 36px Tahoma,Arial,sans-serif';x.fillText('تقبّل الله منا ومنكم صالح الأعمال',W/2,1325);
 return c
}
function showCard(){
 const u=cardCanvas().toDataURL('image/png');$('#cvi').src=u;$('#cvd').href=u;$('#cv').classList.add('s');
 const sb=$('#cvs');sb.hidden=!navigator.canShare;
 sb.onclick=async()=>{try{const b=atob(u.split(',')[1]),a=new Uint8Array(b.length);for(let i=0;i<b.length;i++)a[i]=b.charCodeAt(i);const f=new File([a],'ramadan-card.png',{type:'image/png'});if(navigator.canShare({files:[f]}))await navigator.share({files:[f],text:'تحدي رمضان'});else toast('المتصفح ده مبيدعمش مشاركة الصور، نزّلها أو احفظها')}catch(e){}}
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
  ['الإجمالي: ',P+' من 145 صلاة، '+Math.max(W*30/145,jCnt()).toFixed(1)+' من 30 جزء ('+tot+'%)'],
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
 [['الأسبوع',wp+'/'+(w1-w0)*5+' صلاة، '+ww+'/'+(w1-w0)*5+' ورد'],['الإجمالي',P+'/145 صلاة، '+Math.max(W*30/145,jCnt()).toFixed(1)+'/30 جزء']].forEach(([k,v])=>{const c=mk('div','rc');c.append(mk('small','',k),mk('b','',v));sb.append(c)});
 e.append(hd,bar,grid,sb,mk('p','rm',line[line.length-1][0]))
}
function chips(){
 const T=pt(new Date());
 [['#g1',0,PR],['#g2',5,PR],['#g3',10,EX]].forEach(([s,o,Ls])=>{const c=$(s);c.innerHTML='';Ls.forEach((n,i)=>{const b=document.createElement('button');b.className='chip c2 c';b.dataset.d=S.day;b.dataset.i=o+i;b.style.width='auto';b.style.height='auto';b.textContent=n+(o===0?' '+T[i]:'');b.setAttribute('aria-pressed','false');c.append(b)})});
 $('#ayt').textContent=AY[ayI][0];$('#ays').textContent=AY[ayI][1];azr();
 $('#ift').textContent='مواقيت اليوم '+new Date().toLocaleDateString('ar-EG',{day:'numeric',month:'long'})+' - '+cy().n+' (تقريبية)';const fb=$('#ifb');fb.hidden=!inRm();fb.textContent='🌙 الإفطار '+T[3]+'، والإمساك '+T[0];
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
 const P=cnt(0,N,0,5),W=cnt(0,N,5,10),jz=jCnt(),PA=Math.max(W*30/145,jz),pp=Math.round(P/145*100),qp=Math.round(PA/30*100),tot=Math.round((P+W)/290*100);
 tick($('#sp'),P);tick($('#sq'),PA,1);tick($('#tp'),tot,0,'%');
 $('#bp').style.width=pp+'%';$('#bq').style.width=qp+'%';$('#rg').style.strokeDashoffset=326.7*(1-tot/100);
 $('#mp').textContent=msg(pp);$('#mq').textContent=msg(qp);
 $$('.c').forEach(b=>{const on=g(+b.dataset.d,+b.dataset.i);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
 $('#dl').textContent=(S.day+1)+' رمضان';$('#dp').textContent='إنجاز اليوم '+cnt(S.day,S.day+1,0,10)*10+'%';
 report();table();$$('.c').forEach(b=>b.classList.toggle('on',g(+b.dataset.d,+b.dataset.i)));extras();kh();ln();wr();
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
$('#ex').onclick=async()=>{const t=JSON.stringify(S);$('#bk').value=t;try{await navigator.clipboard.writeText(t)}catch(e){$('#bk').select()}toast('تم نسخ النسخة الاحتياطية، احفظها في مكان آمن')};
$('#im').onclick=()=>{try{const o=JSON.parse($('#bk').value);if(typeof o.p!=='string'||o.p.length!==K*N)throw 0;S=Object.assign(S,o);save();setTheme(S.theme||'dark');$('#hi').textContent=S.name?'أهلاً يا '+S.name:'';setDay(S.day);toast('تم استرجاع التقدّم')}catch(e){toast('النسخة غير صالحة، انسخها كاملة وجرّب تاني')}};
$('#pgi').oninput=()=>{const was=[...Array(30)].map((_,i)=>jDone(i));const v=Math.max(0,Math.min(604,Math.floor(+$('#pgi').value||0)));if(v)S.pg[S.day]=v;else delete S.pg[S.day];save();update();const nws=[];was.forEach((x,i)=>{if(!x&&jDone(i))nws.push(i)});if(nws.length){nws.forEach(i=>$('#jz').children[i].classList.add('pop'));toast('ما شاء الله! خلّصت '+(nws.length>1?'الأجزاء '+nws.map(i=>i+1).join('، '):'الجزء '+(nws[0]+1)))}};
function ayR(){let i;do{i=Math.floor(Math.random()*AY.length)}while(i===ayI);ayI=i;S.ayl=i;save();const p=$('#ayt'),s=$('#ays');p.style.opacity=0;s.style.opacity=0;setTimeout(()=>{p.textContent=AY[i][0];s.textContent=AY[i][1];p.style.opacity=1;s.style.opacity=1},500)}
setInterval(ayR,45000);
const cs=$('#cty');Object.keys(CTS).forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=CTS[k].n;cs.append(o)});cs.value=CTS[S.city]?S.city:'cairo';
cs.onchange=()=>{S.city=cs.value;save();chips();update();cdn.n=undefined;cdn()};
$('#loc').onclick=()=>{if(!navigator.geolocation){toast('المتصفح ده مبيدعمش تحديد الموقع');return}navigator.geolocation.getCurrentPosition(pos=>{let b=null,bd=1e9;const la=pos.coords.latitude,lg=pos.coords.longitude;for(const k in CTS){const c=CTS[k],d=(c.la-la)**2+((c.lg-lg)*Math.cos(la*Math.PI/180))**2;if(d<bd){bd=d;b=k}}S.city=b;save();cs.value=b;chips();update();cdn.n=undefined;cdn();toast('تم اختيار محافظة '+CTS[b].n)},()=>toast('معرفتش أحدد موقعك، اختار المحافظة بإيدك'),{timeout:10000})};
const paintSnd=()=>{$('#snd').textContent=S.snd?'🔔':'🔕'};
$('#snd').onclick=()=>{S.snd=!S.snd;if(S.snd){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume&&AC.resume();beep()}catch(e){}toast('تم تفعيل تنبيه وقت الصلاة (نغمة بسيطة)، وخلي الصفحة مفتوحة')}save();paintSnd()};
document.addEventListener('click',()=>{if(S.snd&&!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}});
paintSnd();
$('#cb').onclick=showCard;$('#cvx').onclick=()=>$('#cv').classList.remove('s');$('#cv').onclick=e=>{if(e.target.id==='cv')$('#cv').classList.remove('s')};
autoDay();chips();update();cdn();setInterval(cdn,1000);
if(S.name)setTimeout(()=>greet(false),500);else $('#wl').classList.add('s');

if('serviceWorker' in navigator&&/^https?:/.test(location.protocol))window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
