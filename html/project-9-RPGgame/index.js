const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;

function adjustScreenSize(){
  width = document.body.offsetWidth;
  height = document.body.offsetHeight;
  canvas.width = width;
  canvas.height = height;
  ctx.translate(Math.ceil(width/2),Math.ceil(height/2));
}

const contact = document.getElementById("contact");
const step = document.getElementById("step");
const reverse = document.getElementById("reverse");
const run = document.getElementById("run");
let m = 0;
let c = 0;
let a = false;

contact.addEventListener("change", e => {
  m = e.target.value;
});

step.addEventListener("change", e => {
  c = e.target.value;
});

reverse.addEventListener("change", e => {
  a = !a;
})

run.addEventListener("click", e => {
  const y = m/c;
  const x = 360/y;
  const r = x*Math.PI/180;
  const add = a ? r/2 : 0;

  for(let i = 0; i < m; i++){
    ctx.beginPath();
    ctx.moveTo(Math.sin(r*i + add)*400,-Math.cos(r*i + add)*400);
    ctx.lineTo(Math.sin(r*(i+1) + add)*400,-Math.cos(r*(i+1) + add)*400);
    ctx.stroke();
  }
});

adjustScreenSize();

ctx.arc(0,0,400,0,Math.PI*2);
ctx.stroke();

//x^2+y^2=20^2
//y=360/(180-2x)
//y=180/(90-x)
//90-x=180/y
//x=90-180/y