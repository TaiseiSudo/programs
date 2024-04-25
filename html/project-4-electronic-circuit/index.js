const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

let width = 0
let height = 0

function adjustScreenSize(){
  width = document.body.offsetWidth;
  height = document.body.offsetHeight;
  canvas.width = width;
  canvas.height = height;
  ctx.translate(Math.ceil(width/2),Math.ceil(height/2));
}

ctx.beginPath();
