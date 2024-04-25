const body = document.getElementById("body");
const audioCtx = new AudioContext;
let soundList = {};

for(let i = 0; i < 15; i++){
  const span = document.createElement("span");
  span.classList.add("area");
  body.appendChild(span);
}

body.addEventListener("touchstart", e => {
  for (const elm of e.changedTouches) {
    soundList[String(elm.identifier)] = audioCtx.createOscillator();
    soundList[String(elm.identifier)].connect( audioCtx.destination );
    soundList[String(elm.identifier)].type = 'sine';
    soundList[String(elm.identifier)].frequency.value = adjustFrq(elm.clientX);
    soundList[String(elm.identifier)].start();
  }
  console.log(soundList,"start");
});

body.addEventListener("touchmove", e => {
  for (const elm of e.changedTouches) {
    soundList[String(elm.identifier)].frequency.setValueAtTime(adjustFrq(elm.clientX), audioCtx.currentTime);
  }
  console.log(soundList,"move");
});

body.addEventListener("touchend", e => {
  for (const elm of e.changedTouches) {
    soundList[String(elm.identifier)].stop();
    delete soundList[String(elm.identifier)];
  }
  console.log(soundList,"stop");
});

function adjustFrq(num) {
  const h = document.body.clientWidth;
  const low = 123.471;
  const high = 277.183;
  const rate = num / h;
  console.log(rate * high + low, num);
  return rate * high + low;
}