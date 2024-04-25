const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");
const GRAVITY = 98 * 0.001;

let dirArrow = [false,false,false,false];
let numv = 0;
let numh = 0;
let vertical = 0;
let horizon = 0;

let width = 0
let height = 0

function adjustScreenSize(){
  width = document.body.offsetWidth;
  height = document.body.offsetHeight;
  canvas.width = width;
  canvas.height = height;
  ctx.translate(Math.ceil(width/2),Math.ceil(height/2));
}

function crealScreen(){
  ctx.clearRect(-width/2,-height/2,width,height);
}

function calcArrow(max){
  const ext = 10;
  const add = 20;

  if((dirArrow[0] && numv <= 1000) || (!dirArrow[1] && numv < 0)){
    numv += add;
  }
  if((dirArrow[1] && numv >= -1000) || (!dirArrow[0] && numv > 0)){
    numv -= add;
  }
  if((dirArrow[2] && numh <= 1000) || (!dirArrow[3] && numh < 0)){
    numh += add;
  }
  if((dirArrow[3] && numh >= -1000) || (!dirArrow[2] && numh > 0)){
    numh -= add;
  }

  vertical = (2/(1 + Math.exp(-numv / 1000 * ext)) - 1) * max;
  horizon = (2/(1 + Math.exp(-numh / 1000 * ext)) - 1) * max;

  return new Vector(horizon,vertical);
}

function drawObjects(args){
  crealScreen();
  args.forEach(element => {
    element.move();
  });
}

function update(args){
}

class Vector{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

class Ball{
  constructor(objs,x,y,r,e,isGravity=true,isAirResistance=true,numAirResistance=0.005,isArrow=true){
    this.objs = objs;
    this.x = x;
    this.y = y;
    this.r = r;
    this.e = e;
    this.isGravity = isGravity;
    this.isAirResistance = isAirResistance;
    this.numAirResistance = numAirResistance;
    this.isArrow = isArrow;
    this.velocity = new Vector(0,0);
  }
  move(){
    if(this.isGravity){
      this.velocity.y -= GRAVITY;
    }
    if(this.isArrow){
      this.addForce(calcArrow(0.1));
    }
    if(this.isAirResistance){
      this.velocity.x *= (1-this.numAirResistance);
      this.velocity.y *= (1-this.numAirResistance);
    }
    /*
    this.objs.forEach(element => {
      if(element.constructor.name == "GravityPoint"){
        if (Math.sqrt((element.x - this.x)**2 + (element.y - this.y)**2) > this.r){
          if(Math.sqrt(element.x - this.x)**2 > this.r){
            this.velocity.x += element.power*10 / (element.x - this.x);
          }
          if(Math.sqrt(element.y - this.y)**2 > this.r){
            this.velocity.y += element.power*10 / (element.y - this.y);
          }
        }
      }
    });*/

    this.ishit();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    ctx.beginPath();
    ctx.arc(this.x,-this.y,this.r*2,0,Math.PI*2);
    ctx.fill();
  }
  addForce(...vecs){
    if(vecs.length == 1 && vecs[0].constructor.name == "Vector"){
      this.velocity.x += vecs[0].x;
      this.velocity.y += vecs[0].y;
    }
    else if(vecs.length == 2 && typeof(vecs[0]) == "number" && typeof(vecs[1]) == "number"){
      this.velocity.x += vecs[0];
      this.velocity.y += vecs[1];
    }
  }
  ishit(){
    if((this.x - this.r < -width/2 && this.velocity.x < 0) || (this.x + this.r > width/2 && this.velocity.x > 0)){
      this.velocity.x = - this.velocity.x * this.e;
    }
    if((this.y - this.r < -height/2 && this.velocity.y < 0) || (this.y + this.r > height/2 && this.velocity.y > 0)){
      this.velocity.y = - this.velocity.y * this.e;
    }
  }
}

class GravityPoint{
  constructor(x,y,power,isrepulsive=false){
    this.x = x;
    this.y = y;
    this.power = power;
    this.isrepulsive = isrepulsive;
  }
  move(){
    ctx.beginPath();
    ctx.fillstyle = "#faa";
    ctx.arc(this.x,-this.y,3*2,0,Math.PI*2);
    ctx.fill();
    ctx.fillstyle = "#000";
  }

}

function main(){
  window.addEventListener("resize",function(){
    adjustScreenSize();
  });
  window.addEventListener("keydown",function(e){
    switch(e.key){
      case "ArrowUp":
        dirArrow[0] = true;
        break;
      case "ArrowDown":
        dirArrow[1] = true;
        break;
      case "ArrowRight":
        dirArrow[2] = true;
        break;
      case "ArrowLeft":
        dirArrow[3] = true;
        break;
    }
  });
  window.addEventListener("keyup",function(e){
    switch(e.key){
      case "ArrowUp":
        dirArrow[0] = false;
        break;
      case "ArrowDown":
        dirArrow[1] = false;
        break;
      case "ArrowRight":
        dirArrow[2] = false;
        break;
      case "ArrowLeft":
        dirArrow[3] = false;
        break;
    }
  });

  adjustScreenSize();

  let objects = [];

  objects.push(new Ball(objects,0,0,10,0.9,true));
  objects.push(new GravityPoint(0,0,10,true));
  setInterval(drawObjects,1,objects);
  setInterval(update,1,objects);
}

main();