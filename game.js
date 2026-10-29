/* ===== pixel helpers + sprites ===== */
const cv=document.getElementById('cv'),g=cv.getContext('2d');g.imageSmoothingEnabled=false;
const W=160,H=200;
const K={sky:'#7cc6f2',sky2:'#b4e0f8',cloud:'#ffffff',cloud2:'#dcecf7',grass:'#5aa83c',grass2:'#46902f',grass3:'#7fc25a',dark:'#2c5a22',
 road:'#5d5f6b',road2:'#7c7e8c',lane:'#f2e28b',water:'#3f8fd0',water2:'#6cb4e8',water3:'#9fd3f2',trunk:'#7a4a24',leaf:'#2f8a3a',leaf2:'#25702f',
 skin:'#e0ac82',skin2:'#c98f66',hair:'#241a14',tee:'#17171d',jean:'#2f4a7a',jean2:'#223a62',shoe:'#101015',red:'#d62839',red2:'#a81c2c',red3:'#ef5a68',
 wood:'#a8703a',wood2:'#7e5028',stone:'#b9b4a6',stone2:'#8f8a7c',brick:'#b4553a',roof:'#6b6f80',ink:'#14142b',glass:'#9fd4f0',heart:'#ff4d6d'};
const R=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h)};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*clamp(t,0,1);
function hash(n){n=Math.sin(n*127.1)*43758.5453;return n-Math.floor(n)}

/* Luis: 5'7" -> 30px tall, broader. Black tee, jeans, glasses. gy = ground y, f = facing (1 right) */
function luis(x,gy,o={}){
  const f=o.f||1,w=o.w||0,sit=!!o.sit,bx=Math.round(x),lift=o.lift||0;
  const P=(dx,dy,ww,hh,c)=>R(bx+(f>0?dx:-dx-ww),gy-lift-dy-hh,ww,hh,c);
  const d=sit?5:0;
  if(sit){P(-4,8,11,4,K.jean);P(5,2,4,10,K.jean);P(5,0,5,2,K.shoe)}
  else{
    const a=w===1?2:0,b=w===2?2:0;
    P(-5,2+a,4,11-a,K.jean);P(1,2+b,4,11-b,K.jean2);
    P(-5,0+a,5,2,K.shoe);P(1,0+b,5,2,K.shoe);
  }
  P(-5,13-d,10,11,K.tee);                 // torso
  P(-7,13-d+(w?1:0),2,8,K.tee);P(5,13-d-(w?1:0),2,8,K.tee); // arms
  P(-7,12-d+(w?1:0),2,2,K.skin);P(5,12-d-(w?1:0),2,2,K.skin);
  P(-3,24-d,6,6,K.skin);P(-3,28-d,6,2,K.hair);P(-4,26-d,1,3,K.hair); // head + hair
  P(0,26-d,4,2,K.ink);P(1,26-d,1,1,K.glass);P(3,26-d,1,1,K.glass);   // glasses (front side)
  if(o.smile)P(1,24-d,2,1,K.skin2);
}
/* Mou: 5'0" -> 27px tall, slimmer. Red burqa. */
function mou(x,gy,o={}){
  const f=o.f||1,w=o.w||0,sit=!!o.sit,bx=Math.round(x),lift=o.lift||0;
  const P=(dx,dy,ww,hh,c)=>R(bx+(f>0?dx:-dx-ww),gy-lift-dy-hh,ww,hh,c);
  const d=sit?4:0;
  if(sit){P(-4,6,9,4,K.red2);P(4,0,4,8,K.red)}
  else{P(-5,0,10,4,K.red2);P(-4,3,8,3,K.red)}
  P(-4,6-d+(sit?4:0),8,12-(sit?4:0),K.red);                       // robe body
  P(-4,6-d+(sit?4:0),2,12-(sit?4:0),K.red3);                       // light fold
  if(!sit){P(-3,0,3,1+(w===1?1:0),K.shoe);P(1,0,3,1+(w===2?1:0),K.shoe)}
  P(-6,11-d,2,7,K.red);P(4,11-d,2,7,K.red);P(-6,10-d,2,2,K.skin);P(4,10-d,2,2,K.skin); // sleeves + hands
  P(-4,18-d,8,8,K.red);P(-3,26-d,6,1,K.red);                       // hijab
  P(0,19-d,4,5,K.skin);P(1,22-d,1,1,K.ink);P(3,22-d,1,1,K.ink);   // face opening
  if(o.smile)P(1,20-d,2,1,K.red2);
}
function heart(x,y,s,c){const m=['01010','11111','01110','00100'];g.fillStyle=c||K.heart;
  m.forEach((r,j)=>[...r].forEach((v,i)=>{if(v==='1')g.fillRect(Math.round(x+i*s),Math.round(y+j*s),s,s)}))}
function cloud(x,y,s=1){R(x+2*s,y+3*s,16*s,4*s,K.cloud);R(x+5*s,y,8*s,5*s,K.cloud);R(x+10*s,y+1*s,6*s,4*s,K.cloud);R(x+2*s,y+6*s,16*s,1*s,K.cloud2)}
function palm(x,gy,s=1){R(x,gy-22*s,2,22*s,K.trunk);const t=gy-22*s;
  R(x-6*s,t,7*s,2,K.leaf);R(x+1,t,7*s,2,K.leaf);R(x-4*s,t-2,5*s,2,K.leaf2);R(x+1,t-2,5*s,2,K.leaf2);R(x-1,t-4,3,3,K.leaf)}
function mango(x,gy,s=1){R(x-2,gy-16*s,4,16*s,K.trunk);
  R(x-14*s,gy-30*s,28*s,14*s,K.leaf);R(x-10*s,gy-36*s,20*s,8*s,K.leaf);R(x-16*s,gy-24*s,6*s,6*s,K.leaf2);R(x+10*s,gy-26*s,6*s,6*s,K.leaf2);
  R(x-9*s,gy-20*s,5*s,2,K.leaf2);R(x+3*s,gy-30*s,6*s,2,K.leaf2)}
function bus(x,gy,t=0,doorOpen=false){ // 56x22 local bus, faces right
  const y=gy-22+(Math.floor(t*8)%2?0:-1),bx=Math.round(x);
  R(bx,y+2,56,16,'#e8b92a');R(bx,y+10,56,3,'#d6482f');R(bx+2,y,50,3,'#d6482f');
  for(let i=0;i<4;i++){R(bx+4+i*10,y+4,8,6,K.glass);R(bx+6+i*10,y+6,3,4,'#3b2c24')}
  R(bx+44,y+3,10,8,K.glass);if(doorOpen)R(bx+46,y+11,6,8,K.ink);else R(bx+46,y+11,6,8,'#caa21f');
  R(bx+52,y+13,4,4,'#fff6c0');
  [8,40].forEach(wx=>{R(bx+wx,gy-7,9,7,K.ink);R(bx+wx+3,gy-4,3,3,'#888')});
}
function auto(x,gy,t=0){ // green CNG auto, faces right, 30x20
  const y=gy-20+(Math.floor(t*10)%2?0:-1),bx=Math.round(x);
  R(bx,y+4,28,13,'#2f9c4d');R(bx+2,y,22,5,'#1f6e35');R(bx+4,y+6,12,6,K.glass);R(bx+18,y+5,8,7,K.glass);
  R(bx+27,y+10,3,5,'#fff6c0');R(bx,y+13,28,2,'#1f6e35');
  [4,21].forEach(wx=>{R(bx+wx,gy-6,7,6,K.ink);R(bx+wx+2,gy-4,2,2,'#888')});
}
function sign(x,gy,txt,col){ // roadside sign: text drawn later in HTML-free canvas via blocks
  R(x,gy-28,2,28,K.wood2);R(x-12,gy-36,26,10,col||'#2a6fb0');R(x-12,gy-36,26,1,'#fff');R(x-12,gy-27,26,1,'#fff')}

/* ===== scenes (a): sky, rain, bus stops, bus/auto rides ===== */
const GY=h=>Math.round(h*0.62);
function sky(h,t,tint){ // afternoon October: blue sky, white clouds
  const gy=GY(h);R(0,0,W,gy,K.sky);R(0,0,W,Math.round(gy*.35),'#66b9ec');R(0,Math.round(gy*.6),W,Math.round(gy*.4),K.sky2);
  const s=t/1000;[[10,10,1.4,3],[70,22,1,2],[120,8,1.2,2.5],[40,34,.8,1.5]].forEach(([x,y,z,v])=>{
    cloud(((x+s*v)%(W+40))-30,y*(h/100>1?1.4:1),Math.max(1,Math.round(z*(h/100>1?1.6:1.2))))});
  if(tint)R(0,0,W,gy,tint)}
function rainOn(t){return ((t/1000)%20)<9}
function rain(h,t){ // ziri ziri: light diagonal drizzle, comes and goes
  const ph=(t/1000)%20,k=ph<9?Math.min(1,ph/1.5,(9-ph)/1.5):0;if(k<=0)return;
  const n=Math.round(46*k);g.fillStyle='rgba(215,235,255,.85)';
  for(let i=0;i<n;i++){const x=(hash(i)*(W+20)-t/45*.6+400)%(W+20),y=(hash(i+77)*h+t/9)%h;g.fillRect(Math.round(x),Math.round(y),1,3)}
  g.fillStyle='rgba(40,60,100,'+(0.14*k)+')';g.fillRect(0,0,W,h)}
function fields(h,sc){ // grass band + far tree line, scrolls with sc
  const gy=GY(h);R(0,gy-12,W,12,K.grass3);R(0,gy-4,W,h-gy+4,K.grass);
  for(let i=0;i<8;i++){const x=((i*28-sc*.3)%(W+40)+W+40)%(W+40)-20;R(x,gy-16,12,5,K.dark);R(x+2,gy-19,8,4,K.leaf2)}
  for(let i=0;i<5;i++){const x=((i*44-sc*.6)%(W+60)+W+60)%(W+60)-20;palm(x,gy-2,1)}}
function road(h,sc,y){const gy=GY(h);y=y??gy+4;R(0,y,W,h-y,K.road);R(0,y,W,1,K.road2);
  for(let i=0;i<8;i++){const x=((i*30-sc)%(W+40)+W+40)%(W+40)-20;R(x,y+Math.round((h-y)*.45),14,2,K.lane)}}
function shelter(x,gy){R(x,gy-20,2,20,K.wood2);R(x+22,gy-20,2,20,K.wood2);R(x-3,gy-24,30,5,K.roof);R(x-3,gy-24,30,1,K.road2);
  R(x+3,gy-8,18,2,K.wood);R(x+3,gy-6,2,6,K.wood2);R(x+19,gy-6,2,6,K.wood2)}
function board(x,gy,col){R(x,gy-26,2,26,K.wood2);R(x-11,gy-34,24,10,col);R(x-11,gy-34,24,1,'#fff');R(x-11,gy-25,24,1,'#fff');
  R(x-7,gy-31,16,1,'#fff');R(x-7,gy-29,10,1,'#fff')}

/* Bus stop panel. who:'L'|'M'. el = ms since stop phase began. boarded: char already in bus. Draws into [0,h). */
function stopScene(h,t,who,el,boarded,ph){
  const gy=GY(h);sky(h,t);fields(h,0);
  if(who==='M'){ // Parbatipur: junction town, station building + rail line in the distance
    R(104,gy-30,38,18,K.brick);R(100,gy-33,46,4,K.roof);R(108,gy-24,6,12,K.ink);R(122,gy-24,6,6,K.glass);R(132,gy-24,6,6,K.glass);
    R(0,gy-6,W,1,K.stone2);for(let i=0;i<20;i++)R(i*9,gy-7,2,3,K.wood2)}
  road(h,0);
  shelter(14,gy+2);board(58,gy+2,who==='L'?'#2a7f4f':'#2a6fb0');
  const bx=lerp(175,70,(el-3800)/1500),stopped=el>=5300;
  const showBus=ph>=1&&el>3800&&ph<2;
  if(showBus){bus(bx,gy+22,t/1000,stopped)}
  if(!boarded&&ph<2){const idle=Math.floor(t/500)%2;const f=1;
    if(who==='L')luis(36,gy+2,{f,smile:false,w:0});else mou(36,gy+2,{f});
    if(stopped&&Math.floor(t/400)%2===0){R(37,gy-44+idle,3,5,K.gold||'#ffd23f');R(37,gy-38+idle,3,2,'#ffd23f')}}
}
function bobble(t){return Math.floor(t/140)%2}

/* Ride panel: bus (or auto) cruising right, world scrolls left. */
function rideScene(h,t,who,el,veh,heads){
  const gy=GY(h),sc=el*0.09;sky(h,t);fields(h,sc);road(h,sc*1.8);
  for(let i=0;i<4;i++){const x=((i*60-sc*1.2)%(W+80)+W+80)%(W+80)-10;R(x,gy-18,2,20,K.wood2);R(x-4,gy-18,10,1,K.wood2)}
  if(veh==='bus'){const bx=52;bus(bx,gy+24,t/1000,false);
    if(who==='L'){R(bx+6,gy+24-17,6,5,K.skin);R(bx+6,gy+24-20,6,3,K.hair);R(bx+6,gy+24-16,6,1,K.ink)}
    if(who==='M'){R(bx+6,gy+24-18,6,6,K.red);R(bx+8,gy+24-16,3,3,K.skin)}}
  else{const bx=58;auto(bx,gy+24,t/1000);
    R(bx+5,gy+24-15,5,5,K.skin);R(bx+5,gy+24-17,5,3,K.hair);R(bx+5,gy+24-14,5,1,K.ink);
    R(bx+11,gy+24-15,5,5,K.red);R(bx+12,gy+24-14,3,3,K.skin)}
  g.fillStyle='rgba(0,0,0,.08)';g.fillRect(0,gy+22,W,2)}

/* ===== scenes (b): Dinajpur bus stand, Ramsagar ===== */
function dinBG(h,t){
  const gy=GY(h);sky(h,t);
  const cols=[K.brick,'#c9a45c','#8d9aa8','#b4553a','#d9c48b'];
  for(let i=0;i<6;i++){const x=i*28-4,hh=22+((i*7)%3)*6;
    R(x,gy-hh-6,26,hh+6,cols[i%5]);R(x,gy-hh-8,26,3,K.roof);R(x+3,gy-hh+2,6,6,K.glass);R(x+14,gy-hh+2,6,6,K.glass);R(x+8,gy-12,10,10,K.ink)}
  R(0,gy-6,W,h-gy+6,K.stone);R(0,gy-6,W,1,K.stone2);
  for(let i=0;i<10;i++)R((i*37)%W,gy+8+((i*13)%Math.max(8,h-gy-12)),9,1,K.stone2);
  board(26,gy+4,'#2a6fb0');
  auto(126,gy+10,0);auto(100,gy+9,0);
  [[92,gy+18],[28,gy+26],[122,gy+30]].forEach(([x,y],i)=>{if(y>h-4)return;R(x,y,18,3,K.water);R(x+2,y,6,1,K.water3);
    if(rainOn(t)){const r=(t/300+i)%3;R(x+8-r,y+1,Math.round(2*r+2),1,K.water3)}})}

/* Ramsagar dighi: world is 460px wide; spots are bench, mango tree, pond edge. cam = left edge of view. */
const WORLD=460,SPOTS=[70,225,385];
function ramBG(h,t,cam,tint){
  const gy=GY(h),s=t/1000;sky(h,t);
  const wy=gy-26;
  R(0,wy-8,W,10,K.dark);for(let i=0;i<12;i++){const x=((i*22-cam*.25)%(W+40)+W+40)%(W+40)-20;R(x,wy-12,14,6,K.leaf2);R(x+3,wy-15,8,4,K.leaf)}
  R(0,wy,W,36,K.water);R(0,wy,W,2,K.water2);
  for(let i=0;i<14;i++){const x=((i*19+s*6-cam*.5)%(W+30)+W+30)%(W+30)-15;R(x,wy+5+(i*7)%26,9+(i%3)*3,1,K.water3)}
  [[22,8],[88,14]].forEach(([x,y])=>R(x,wy+y,14,2,'rgba(255,255,255,.55)'));
  R(0,gy+6,W,h-gy-6,K.grass);R(0,gy+4,W,3,K.grass3);   // embankment
  R(0,gy+6,W,9,'#c8a46a');R(0,gy+6,W,1,'#e1c48c');    // footpath
  for(let i=0;i<30;i++){const x=((i*13)-cam)%(W);R(x,gy+28+(i*11)%Math.max(6,h-gy-34),2,2,K.grass2)}
  const X=x=>x-cam;
  // entrance board
  R(X(10),gy-22,2,28,K.wood2);R(X(-1),gy-30,24,10,'#2a6fb0');R(X(-1),gy-30,24,1,'#fff');
  // spot 1: bench
  const b=X(SPOTS[0]);R(b-18,gy+2,36,3,K.wood);R(b-18,gy-8,36,2,K.wood);R(b-18,gy-6,36,1,K.wood2);R(b-17,gy+5,2,6,K.wood2);R(b+15,gy+5,2,6,K.wood2);R(b-17,gy-8,2,10,K.wood2);R(b+15,gy-8,2,10,K.wood2);
  // spot 2: mango tree + shade
  const m=X(SPOTS[1]);R(m-26,gy+12,52,5,'rgba(0,0,0,.14)');mango(m,gy+11,1.3);
  // spot 3: pond edge steps
  const e=X(SPOTS[2]);for(let i=0;i<4;i++){R(e-22+i*3,gy+2+i*5,44-i*6,5,i%2?K.stone2:K.stone)}
  R(e-26,wy+26,52,6,K.water2);
  // small palms along the far end
  palm(X(436),gy+4,1);palm(X(300),gy+2,1);palm(X(150),gy+2,1);
  if(tint)R(0,0,W,h,tint)}
const camFor=(a,b)=>clamp((a+b)/2-W/2,0,WORLD-W);

/* ===== game state, room sync, test bot, chat ===== */
const $=id=>document.getElementById(id);
const NAME={L:'লুইস',M:'মৌ'};
let TEST=false,WAIT=120000,room=null,roomState='connecting';
const mk=r=>({r,rd:false,ph:0,b1:false,b2:false,x:30,f:1,mv:0,home:false,vis:0,hg:0,ks:0,n:0,mg:[]});
const me=mk(null),loc={t0:0,pub:''};
const bot={s:mk(null),l:{t0:0},due:0,said:0};
const seenMsg={L:0,M:0},seenFx={hg:0,ks:0},oSeen={ph:-1,t:0};
const NONE=mk(null);
const SHARED=['r','rd','ph','b1','b2','x','f','mv','home','vis','hg','ks','n','mg'];

function partner(){
  if(TEST)return bot.s;
  if(!room||!me.r)return NONE;
  const p=room.peers().find(q=>!q.isMe&&q.presence&&q.presence.r&&q.presence.r!==me.r);
  return p?p.presence:NONE;
}
function takenRoles(){
  const t={L:false,M:false};if(room)room.peers().forEach(q=>{if(!q.isMe&&q.presence&&q.presence.r)t[q.presence.r]=true});return t;
}
function publish(){
  if(!room||TEST)return;
  const patch={};let sig='';
  SHARED.forEach(k=>{patch[k]=k==='x'?Math.round(me.x):me[k];sig+=JSON.stringify(patch[k])+'|'});
  if(sig===loc.pub)return;loc.pub=sig;room.presence(patch).catch(()=>{});
}

function advance(S,O,L,now){
  const ph=S.ph,el=now-L.t0,op=O.ph||0;
  if(ph===0){if(S.rd&&O.rd){S.ph=1;L.t0=now}}
  else if(ph===1){if(S.b1&&O.b1){S.ph=2;L.t0=now}}
  else if(ph===2){if(S.r==='L'){if(el>8000){S.ph=3;L.t0=now}}else if(el>8000+WAIT){S.ph=4;L.t0=now}}
  else if(ph===3){if(op>=4){S.ph=4;L.t0=now}}
  else if(ph===4){if(S.b2&&O.b2){S.ph=5;L.t0=now}}
  else if(ph===5){if(el>8000){S.ph=6;L.t0=now;S.x=S.r==='L'?26:40}}
  else if(ph===6){if(S.home&&O.home){S.ph=7;L.t0=now}}
}

/* solo test: a bot plays the other person */
const BOT_LINES={M:['হুম 🥰','আমি তো পৌঁছে গেছি প্রায়!','তুমি অনেকক্ষণ দাঁড়িয়ে আছো, রাগ করোনি তো?','এখানে খুব সুন্দর লাগছে','আরেকটু বসি 🥺'],
                 L:['আমি পৌঁছে গেছি, তুমি আসো','রাগ করিনি, তোমার জন্য অপেক্ষা করা যায়','বৃষ্টি হচ্ছে, ভিজে যেও না','আমারও ভালো লাগছে 😊']};
function botSay(t){const s=bot.s;s.n++;s.mg=[...s.mg,{i:s.n,t}].slice(-3)}
function botTick(now,dt){
  const s=bot.s,l=bot.l;advance(s,me,l,now);
  if(s.ph===1&&!s.b1&&now-l.t0>6800)s.b1=true;
  if(s.ph===4&&!s.b2&&now-l.t0>9500)s.b2=true;
  if(s.ph===2&&!bot.said&&now-l.t0>2500){bot.said=1;botSay(s.r==='M'?'আমি বাসে, একটু দেরি হবে 🥲':'আমি দিনাজপুরে নেমে গেছি')}
  if(s.ph===6){const tx=clamp(me.x+(s.r==='M'?14:-14),6,WORLD-6),dx=tx-s.x;
    if(Math.abs(dx)>3){s.x+=Math.sign(dx)*38*dt;s.mv=1;s.f=Math.sign(dx)}else s.mv=0;s.home=!!me.home}
  if(bot.due&&now>bot.due){bot.due=0;const a=BOT_LINES[s.r];botSay(a[Math.floor(Math.random()*a.length)])}
}

/* chat: floating boxes over the scene */
function addBox(role,text){
  const feed=$('feed'),d=document.createElement('div');d.className='msg '+(role==='M'?'m':'l');
  const b=document.createElement('b');b.textContent=NAME[role];d.appendChild(b);d.appendChild(document.createTextNode(text));
  feed.appendChild(d);while(feed.children.length>4)feed.firstChild.remove();setTimeout(()=>d.remove(),12500);
}
function sendChat(text){
  text=text.trim().slice(0,120);if(!text||!me.r)return;
  me.n++;me.mg=[...me.mg,{i:me.n,t:text}].slice(-3);addBox(me.r,text);publish();
  if(TEST)bot.due=performance.now()+1500;
}
function pullMsgs(O){
  if(!O.r||!O.mg)return;
  O.mg.forEach(m=>{if(m&&m.i>seenMsg[O.r]){seenMsg[O.r]=m.i;if(typeof m.t==='string')addBox(O.r,m.t.slice(0,120))}});
}

/* hearts etc. in screen space */
const fx=[];
function burst(x,y,n,big){for(let i=0;i<n;i++)fx.push({x:x+(Math.random()*16-8),y:y+(Math.random()*6-3),vy:-(14+Math.random()*16),vx:Math.random()*10-5,life:1.6+Math.random()*.8,s:big?3:2})}
function stepFx(dt){for(let i=fx.length-1;i>=0;i--){const p=fx[i];p.life-=dt;p.y+=p.vy*dt;p.x+=p.vx*dt;if(p.life<=0)fx.splice(i,1)}}
function drawFx(){fx.forEach(p=>{g.globalAlpha=clamp(p.life,0,1);heart(p.x,p.y,p.s,p.s>2?'#ff4d6d':'#ff8aa1');g.globalAlpha=1})}

/* ===== rendering, input, main loop ===== */
const COL={L:'#3aa0ff',M:'#ff4d6d'};
const fxSeen={L:{hg:0,ks:0},M:{hg:0,ks:0}};
const disp={L:26,M:40,cam:0},st={lean:0,met:0,sitT:0,spot:-1,camStart:0,kiss:0,lastPh:-1,cap:''};
let now=0,last=0,dir=0;
const oEl=()=>TEST?now-bot.l.t0:now-oSeen.t;
const togetherSpot=(a,b)=>{for(let i=0;i<3;i++)if(Math.abs(a-SPOTS[i])<20&&Math.abs(b-SPOTS[i])<20)return i;return -1};
const cyOf=()=>GY(200)+11;

function panel(y0,role,S,el,mine){
  g.save();g.beginPath();g.rect(0,y0,W,100);g.clip();g.translate(0,y0);
  const ph=Math.min(S.ph,3);
  if(ph<=1)stopScene(100,now,role,ph===0?0:el,!!S.b1,1);
  else if(ph===2)rideScene(100,now,role,el,'bus');
  else{dinBG(100,now);luis(84,GY(100)+10,{f:Math.floor(now/2500)%2?-1:1});rain(100,now)}
  g.restore();
  R(0,y0,3,100,COL[role]);R(0,y0+98,W,2,'#14142b');
  if(mine){R(W-7,y0+5,4,4,'#ffd23f');R(W-6,y0+6,2,2,'#14142b')}
}
function autoHeads(bx,ay,lin,min){
  if(lin){R(bx+5,ay-15,5,5,K.skin);R(bx+5,ay-17,5,3,K.hair);R(bx+5,ay-14,5,1,K.ink)}
  if(min){R(bx+11,ay-15,5,5,K.red);R(bx+12,ay-14,3,3,K.skin)}}

function drawSplit(Ls,Ms){
  const mineL=me.r==='L';
  const elMe=now-loc.t0,elO=oEl();
  panel(0,'L',Ls,mineL?elMe:elO,mineL);
  panel(100,'M',Ms,mineL?elO:elMe,!mineL);
}
function drawMeet(Ls,Ms){
  const gy=GY(200),fy=gy+10,el=now-loc.t0;
  dinBG(200,now);
  const busX=el<1500?lerp(-70,2,el/1500):el<6200?2:lerp(2,-90,(el-6200)/1500);
  bus(busX,gy+22,now/1000,el>1500&&el<6000);
  const mx=el<1800?30:lerp(30,72,(el-1800)/2700),walking=el>=1800&&el<4500;
  const lx=88,aEl=el-7000,ax=aEl<0?200:lerp(200,122,aEl/1400),parked=el>=8400;
  auto(ax,gy+22,now/1000);
  if(!Ls.b2)luis(lx,fy,{f:el>3600?-1:(Math.floor(now/1800)%2?-1:1),smile:el>4500});
  if(el>=1800&&!Ms.b2)mou(mx,fy,{f:1,w:walking?1+Math.floor(now/150)%2:0,smile:el>4500});
  autoHeads(ax,gy+22,Ls.b2,Ms.b2);
  if(el>4600&&!st.met){st.met=1;burst(80,fy-40,8,true)}
  rain(200,now);
  return{parked,el};
}
function drawPark(Ls,Ms){
  const gy=GY(200),cy=cyOf(),k=1-Math.exp(-(now-last)/1000*12);
  const tsp=togetherSpot(Ls.x,Ms.x),seated=tsp>=0&&!Ls.mv&&!Ms.mv;
  const lean=now<st.lean?2:0;
  disp.L=lerp(disp.L,(seated?SPOTS[tsp]-7+lean:Ls.x),k);disp.M=lerp(disp.M,(seated?SPOTS[tsp]+7-lean:Ms.x),k);
  disp.cam=lerp(disp.cam,camFor(disp.L,disp.M),1-Math.exp(-(now-last)/1000*6));
  ramBG(200,now,disp.cam);
  const lift=seated&&tsp>0?-6:0;
  luis(disp.L-disp.cam,cy,{f:seated?1:(Ls.f||1),w:Ls.mv?1+Math.floor(now/150)%2:0,sit:seated,smile:seated,lift});
  mou(disp.M-disp.cam,cy,{f:seated?-1:(Ms.f||1),w:Ms.mv?1+Math.floor(now/150)%2:0,sit:seated,smile:seated,lift});
  rain(200,now);
  return{tsp,seated};
}
function drawEnd(){
  const cy=cyOf(),el=now-loc.t0,p=clamp(el/3000,0,1),cam=lerp(st.camStart,clamp(SPOTS[2]-80,0,WORLD-W),p);
  ramBG(200,now,cam,'rgba(255,165,80,.22)');
  const Lx=lerp(disp.L,378,p)-cam,Mx=lerp(disp.M,386,p)-cam,hug=el>3200,kiss=el>5600;
  luis(Lx,cy,{f:1,w:p<1?1+Math.floor(now/150)%2:0,smile:hug});
  mou(Mx,cy,{f:-1,w:p<1?1+Math.floor(now/150)%2:0,smile:hug,lift:kiss?2:0});
  if(hug){R(Lx+2,cy-20,11,3,K.tee);R(Lx-5,cy-17,13,3,K.red)}
  if(el>3300&&!st.hugFx){st.hugFx=1;burst(Lx+4,cy-36,8,false)}
  if(kiss&&!st.kiss){st.kiss=1;burst(Lx+5,cy-38,14,true)}
  if(kiss&&el<10000&&Math.floor(el/700)%2===0)heart(Lx+3,cy-44,3,'#ff4d6d');
  if(el>10000){g.fillStyle='rgba(8,8,24,'+clamp((el-10000)/2200,0,.92)+')';g.fillRect(0,0,W,200)}
  return el;
}

function captionText(O,info){
  const ph=me.ph,L=me.r==='L';
  if(ph<1)return'';
  if(ph===1){
    const el=now-loc.t0;
    if(me.b1)return O.b1?'':'বাসে উঠে বসেছ। ওর জন্য অপেক্ষা... ⏳';
    return el>=5300?'বাস এসেছে! পর্দায় ট্যাপ করো 🚌':(L?'বীরগঞ্জ • বাসের অপেক্ষা':'পার্বতীপুর • বাসের অপেক্ষা');
  }
  if(ph===2)return L?'বাসে করে দিনাজপুরের পথে 🚌':((O.ph===3)?'লুইস পৌঁছে গেছে, অপেক্ষা করছে 🥲':'বাসে করে দিনাজপুরের পথে 🚌');
  if(ph===3)return'দিনাজপুর বাস স্ট্যান্ড • মৌ আসছে... ⏳';
  if(ph===4){
    if(me.b2)return O.b2?'':'অটোতে উঠেছ। ওর জন্য অপেক্ষা... ⏳';
    if(info&&info.parked)return'অটো এসেছে! পর্দায় ট্যাপ করো 🛺';
    return now-loc.t0>4500?'দেখা হলো! 🥰':'দিনাজপুর বাস স্ট্যান্ড';
  }
  if(ph===5)return'অটোতে রামসাগরের পথে 🛺';
  if(ph===6){
    const v=me.vis,mark=i=>(v>>i&1)?'✓':'○';
    return info&&info.seated?'পাশাপাশি বসেছ। গল্প করো 💬':'রামসাগর • বেঞ্চ '+mark(0)+'  গাছ '+mark(1)+'  পুকুরপাড় '+mark(2);
  }
  return'';
}

function onPhase(){
  const ph=me.ph;
  $('lobby').hidden=ph>=1;
  $('cap').hidden=ph<1||ph>6;
  $('acts').hidden=ph!==6;
  $('chatIn').disabled=$('sendBtn').disabled=ph<1||ph>6;
  if(ph===6){const Ls=me.r==='L'?me:partner(),Ms=me.r==='M'?me:partner();disp.L=Ls.x;disp.M=Ms.x;disp.cam=camFor(disp.L,disp.M)}
  if(ph===7){st.camStart=disp.cam;$('endcard').hidden=false;$('chatForm').hidden=true;$('acts').hidden=true}
}

function frame(ts){
  const dt=Math.min(.05,(ts-last)/1000||0.016);now=ts;
  const O=partner();
  if(!TEST&&O.ph!==oSeen.ph){oSeen.ph=O.ph||0;oSeen.t=now}
  if(me.r){advance(me,O,loc,now);if(TEST)botTick(now,dt)}
  if(me.ph===6){if(dir){me.x=clamp(me.x+dir*38*dt,6,WORLD-6);me.f=dir;me.mv=1}else me.mv=0}
  if(me.ph!==st.lastPh){st.lastPh=me.ph;onPhase()}
  let info=null;g.clearRect(0,0,W,H);
  if(me.ph<4){drawSplit(me.r==='M'?O:me,me.r==='M'?me:O)}
  else if(me.ph===4)info=drawMeet(me.r==='L'?me:O,me.r==='M'?me:O);
  else if(me.ph===5){rideScene(200,now,me.r,now-loc.t0,'auto')}
  else if(me.ph===6){info=drawPark(me.r==='L'?me:O,me.r==='M'?me:O);
    if(info.seated&&info.tsp===st.spot)st.sitT+=dt;else{st.spot=info.seated?info.tsp:-1;st.sitT=0}
    if(info.seated&&st.sitT>3&&!(me.vis>>info.tsp&1))me.vis|=1<<info.tsp;
    $('hugBtn').disabled=$('kissBtn').disabled=!info.seated;
    const full=(me.vis&7)===7;$('homeBtn').hidden=!full;$('homeBtn').disabled=!!me.home;
    $('homeBtn').textContent=me.home?'ওর জন্য অপেক্ষা...':'ফেরার সময়'}
  else drawEnd();
  // partner actions -> hearts
  [['L',me.r==='L'?me:O],['M',me.r==='M'?me:O]].forEach(([r,S])=>{if(!S||!S.r)return;const s=fxSeen[r];
    if((S.hg||0)>s.hg){s.hg=S.hg;st.lean=now+900;burst(disp.L-disp.cam+10,cyOf()-36,5,false)}
    if((S.ks||0)>s.ks){s.ks=S.ks;st.lean=now+1100;burst(disp.L-disp.cam+10,cyOf()-38,9,true)}});
  stepFx(dt);drawFx();
  if(O.r)pullMsgs(O);
  if(me.ph===7&&now-loc.t0>11500)$('endmsg').hidden=false;
  const c=captionText(O,info);if(c!==st.cap){st.cap=c;$('cap').textContent=c;$('cap').hidden=!c||me.ph<1||me.ph>6}
  if(me.ph===0)lobbyUI(O);
  publish();last=now;requestAnimationFrame(frame);
}

function lobbyUI(O){
  const t=takenRoles();$('roleRow').hidden=!(TEST||roomState==='ok');$('joinBox').hidden=TEST||roomState==='ok'||!!me.r;
  $('pickL').disabled=!TEST&&(t.L||roomState!=='ok');$('pickM').disabled=!TEST&&(t.M||roomState!=='ok');
  if(me.r){$('pickL').hidden=$('pickM').hidden=true;$('testBtn').hidden=true}
  let s='';
  if(roomState==='none'&&!TEST)s=FB.err||'কানেকশন হয়নি। আবার চেষ্টা করো।';else if(roomState==='idle'&&!TEST)s='';
  else if(me.r)s=NAME[me.r]+' হিসেবে ঢুকেছ। '+(O.rd?'দুজনেই তৈরি...':'অন্যজনের ঢোকার অপেক্ষা ⏳');
  else if(t.L||t.M)s=(t.L?NAME.L:NAME.M)+' ঢুকে গেছে ✓';
  if($('lobbyStatus').textContent!==s)$('lobbyStatus').textContent=s;
}
function pick(r){
  if(me.r)return;me.r=r;me.rd=true;
  if(TEST){bot.s.r=r==='L'?'M':'L';bot.s.rd=true}
  publish();
}
$('pickL').onclick=()=>pick('L');$('pickM').onclick=()=>pick('M');
$('testBtn').onclick=()=>{TEST=true;WAIT=12000;$('lobbyHint').textContent='টেস্ট মোড: নিজের নাম বাছো, অন্যজনকে আমি চালাব।';$('testBtn').hidden=true};
$('stage').addEventListener('pointerdown',e=>{
  if(e.target.closest('button'))return;
  if(me.ph===1&&now-loc.t0>=5300&&!me.b1){me.b1=true;publish()}
  else if(me.ph===4&&now-loc.t0>=8400&&!me.b2){me.b2=true;publish()}
});
$('chatForm').addEventListener('submit',e=>{e.preventDefault();const i=$('chatIn');sendChat(i.value);i.value='';i.focus()});
const hold=(id,d)=>{const b=$(id);b.addEventListener('pointerdown',e=>{e.preventDefault();dir=d});
  ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>{if(dir===d)dir=0}))};
hold('goL',-1);hold('goR',1);
addEventListener('keydown',e=>{if(e.target.tagName==='INPUT')return;if(e.key==='ArrowLeft'||e.key==='a')dir=-1;if(e.key==='ArrowRight'||e.key==='d')dir=1});
addEventListener('keyup',e=>{if(['ArrowLeft','ArrowRight','a','d'].includes(e.key))dir=0});
$('hugBtn').onclick=()=>{me.hg++;publish()};$('kissBtn').onclick=()=>{me.ks++;publish()};
$('homeBtn').onclick=()=>{me.home=true;publish()};

requestAnimationFrame(t=>{last=t;requestAnimationFrame(frame)});

/* ===== standalone sync: Firebase Realtime Database instead of the claude.ai room ===== */
roomState='idle';
const FB={cid:Math.random().toString(36).slice(2,10),arr:[],err:'',pending:null,timer:0};
function fbPeers(snapVal){
  const v=snapVal||{};
  FB.arr=Object.keys(v).map(id=>({isMe:id===FB.cid,presence:Object.assign(mk(null),v[id]||{})}));
}
function initFirebaseRoom(code){
  const url=window.FIREBASE_DB_URL||'';
  if(!window.firebase){FB.err='Firebase লাইব্রেরি লোড হয়নি। নেট ঠিক আছে কিনা দেখে পেজ রিলোড দাও।';roomState='none';return}
  if(!/^https:\/\/.+firebase/.test(url)){FB.err='firebase-config.js এ URL ঠিক নেই। পাওয়া গেছে: '+(url?url.slice(0,32):'কিছুই না');roomState='none';return}
  try{
    if(!firebase.apps.length)firebase.initializeApp({databaseURL:url});
    const db=firebase.database(),base=db.ref('rooms/'+code),mine=base.child(FB.cid);
    const flush=()=>{FB.timer=0;const p=FB.pending;FB.pending=null;if(p)mine.update(p).catch(()=>{})};
    room={
      presence(patch){FB.pending=Object.assign(FB.pending||{},patch);if(!FB.timer)FB.timer=setTimeout(flush,90);return Promise.resolve()},
      peers:()=>FB.arr
    };
    base.on('value',s=>fbPeers(s.val()),()=>{FB.err='ডাটাবেসে ঢুকতে পারছি না। Rules ঠিক আছে কি?';roomState='none'});
    db.ref('.info/connected').on('value',s=>{if(s.val()){mine.onDisconnect().remove();loc.pub=''}});
    roomState='ok';
  }catch(e){FB.err='কানেকশন হয়নি: '+(e&&e.message||e);roomState='none'}
}
function joinWithCode(){
  const code=$('codeIn').value.toLowerCase().replace(/[^a-z0-9_-]/g,'');
  if(code.length<4){FB.err='কোড অন্তত ৪টা ইংরেজি অক্ষর বা সংখ্যা হতে হবে।';roomState='none';return}
  FB.err='';initFirebaseRoom(code);
}
$('joinBtn').onclick=joinWithCode;
$('codeIn').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();joinWithCode()}});
try{const m=/[#&]r=([a-z0-9_-]{4,24})/i.exec(location.hash);if(m)$('codeIn').value=m[1]}catch(e){}
