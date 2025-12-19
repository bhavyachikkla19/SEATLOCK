const ROWS = ['A','B','C'];
const COLS = 5;
let seats = []; // {id, status, type}
let lock = false;
let queue = [];
let processing = false;

const seatMapEl = document.getElementById("seat-map");
const logEl = document.getElementById("log");
const modeEl = document.getElementById("mode");

// Initialize seats
function initSeats(){
  seats=[];
  ROWS.forEach((row,rIndex)=>{
    for(let c=1;c<=COLS;c++){
      seats.push({
        id:`${row}${c}`,
        status:'available',
        type: rIndex===0?'vip':'regular',
        user:null
      });
    }
  });
}
initSeats();

// Render seat map
function renderSeatMap(){
  seatMapEl.innerHTML='';
  seats.forEach(seat=>{
    const div=document.createElement('div');
    div.className='seat';
    if(seat.status==='available') div.classList.add(seat.type==='vip'?'vip':'available');
    else div.classList.add(seat.status);

    div.textContent=seat.id;
    div.setAttribute('data-info', seat.status==='booked'?`Booked by ${seat.user}`:seat.status==='in-queue'?`In queue by ${seat.user}`:'Available');

    // Click highlight
    div.onclick=()=>{
      if(seat.status==='available'){
        div.style.boxShadow='0 0 15px 5px rgba(0,123,255,0.7)';
        setTimeout(renderSeatMap,300);
      }
    };
    seatMapEl.appendChild(div);
  });
}

// Log
function log(message){
  const time=new Date().toLocaleTimeString();
  logEl.innerHTML+=`[${time}] ${message}<br>`;
  logEl.scrollTop=logEl.scrollHeight;
}

// Simulate delay
function delay(){ return new Promise(res=>setTimeout(res, Math.random()*2000));}

// Booking
function book(user){
  const mode=modeEl.value;
  if(mode==='bug') bookWithoutControl(user);
  if(mode==='lock') bookWithLock(user);
  if(mode==='queue') bookWithQueue(user);
}

function findAvailableSeat(){ return seats.find(s=>s.status==='available'); }

// ❌ Bug Mode
async function bookWithoutControl(user){
  const seat=findAvailableSeat();
  if(!seat){ log(`${user} failed – no seats`); return; }
  log(`${user} trying seat ${seat.id}`);
  seat.status='in-queue'; seat.user=user;
  renderSeatMap();
  await delay();
  seat.status='booked';
  renderSeatMap();
  log(`❌ ${user} booked ${seat.id}`);
  confettiEffect();
}

// ⚠️ Lock Mode
async function bookWithLock(user){
  if(lock){ log(`${user} blocked by lock`); return; }
  lock=true;
  const seat=findAvailableSeat();
  if(!seat){ log(`${user} failed – no seats`); lock=false; return; }
  log(`${user} acquired lock for ${seat.id}`);
  seat.status='in-queue'; seat.user=user;
  renderSeatMap();
  await delay();
  seat.status='booked';
  renderSeatMap();
  log(`⚠️ ${user} booked ${seat.id}`);
  lock=false;
  confettiEffect();
}

// ✅ Queue Mode
function bookWithQueue(user){
  queue.push(user);
  log(`${user} added to queue`);
  processQueue();
}

async function processQueue(){
  if(processing || queue.length===0) return;
  processing=true;

  const user=queue.shift();
  const seat=findAvailableSeat();
  if(!seat){ log(`❌ ${user} failed – no seats`); processing=false; processQueue(); return; }

  log(`➡️ Processing ${user} for ${seat.id}`);
  seat.status='in-queue'; seat.user=user;
  renderSeatMap();
  await delay();
  seat.status='booked';
  renderSeatMap();
  log(`✅ ${user} booked ${seat.id}`);
  confettiEffect();
  
  processing=false;
  processQueue();
}

// Confetti effect (simple)
function confettiEffect(){
  for(let i=0;i<20;i++){
    const conf=document.createElement('div');
    conf.style.position='absolute';
    conf.style.width='8px'; conf.style.height='8px';
    conf.style.backgroundColor=`hsl(${Math.random()*360},80%,60%)`;
    conf.style.top=`${Math.random()*50 + 50}px`;
    conf.style.left=`${Math.random()*window.innerWidth}px`;
    conf.style.borderRadius='50%';
    conf.style.pointerEvents='none';
    conf.style.opacity='0.8';
    conf.style.transition='all 1s ease-out';
    document.body.appendChild(conf);
    setTimeout(()=>{
      conf.style.top=`${window.innerHeight}px`;
      conf.style.opacity='0';
    },50);
    setTimeout(()=>document.body.removeChild(conf),1200);
  }
}

renderSeatMap();

