const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;

function adjustScreenSize(){
  width = document.body.offsetWidth;
  height = document.body.offsetHeight;
  canvas.width = width;
  canvas.height = height;
}
class Gate{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.input = [];
    this.output = false;
  }
  moveto(x,y){
    this.x = x;
    this.y = y;
  }
  move(x,y){
    this.x += x;
    this.y += y;
  }
  add_input(conecter){
    this.input.push(conecter)
  }
  remove_input(conecter){
    let index = this.input.indexOf(conecter);
    if(index != -1){
      this.input.splice(index,1);
    }
  }
}
class And extends Gate{
  draw(){
    ctx.beginPath();
    ctx.moveTo(this.x - 30, this.y - 20);
    ctx.arc(this.x + 10, this.y, 20, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(this.x - 30, this.y + 20);
    ctx.lineTo(this.x - 30, this.y -20);
    ctx.stroke();
  }
  calc(){
    this.output = true;
    this.input.forEach(elm => {
      this.output &= elm.output;
    });
  }
}
class Or extends Gate{
  draw(){
    ctx.beginPath();
    ctx.moveTo(this.x -30, this.y - 20);
    ctx.quadraticCurveTo(this.x + 20, this.y - 25,this.x + 30, this.y);
    ctx.quadraticCurveTo(this.x + 20, this.y + 25, this.x - 30, this.y + 20);
    ctx.quadraticCurveTo(this.x - 5, this.y, this.x - 30, this.y - 20);
    ctx.stroke();
  }
  calc(){
    this.output = false;
    this.input.forEach(elm => {
      this.output ||= elm.output;
    });
  }
}
class Xor extends Gate{
  draw(){
    ctx.beginPath();
    ctx.moveTo(this.x - 30, this.y - 20);
    ctx.quadraticCurveTo(this.x - 5, this.y, this.x - 30, this.y + 20);
    ctx.moveTo(this.x -25, this.y - 20);
    ctx.quadraticCurveTo(this.x + 20, this.y - 25,this.x + 30, this.y);
    ctx.quadraticCurveTo(this.x + 20, this.y + 25, this.x - 25, this.y + 20);
    ctx.quadraticCurveTo(this.x, this.y, this.x - 25, this.y - 20);
    ctx.stroke();
  }
  calc(){
    let counter = 0;
    this.input.forEach(elm => {
      counter += counter ? 1 : 0;
    });
    this.output = ((counter % 2) == 1);
  }
}
class Nand extends Gate{
  draw(){
    ctx.beginPath();
    ctx.moveTo(this.x - 30, this.y - 20);
    ctx.arc(this.x, this.y, 20, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(this.x - 30, this.y + 20);
    ctx.lineTo(this.x - 30, this.y -20);
    ctx.moveTo(this.x + 30, this.y);
    ctx.arc(this.x + 25, this.y, 5, 0, Math.PI * 2);
    ctx.stroke();
  }
  calc(){
  }
}
class Not extends Gate{
  constructor(x,y){
    super(x,y);
    this.input = null;
  }
  draw(){
    ctx.beginPath();
    ctx.moveTo(this.x - 30, this.y - 20);
    ctx.lineTo(this.x + 20, this.y);
    ctx.lineTo(this.x - 30, this.y + 20);
    ctx.lineTo(this.x - 30, this.y - 20);
    ctx.moveTo(this.x + 30, this.y);
    ctx.arc(this.x + 25, this.y, 5, 0, Math.PI * 2);
    ctx.stroke();
  }
  add_input(conecter){
    this.input = conecter;
  }
  remove_input(conecter){
    if(this.input == conecter){
      this.input = null;
    }
  }
  calc(){
    this.output = !this.input.output;
  }
}

class Display{
  constructor(){
    this.width = 0;
    this.height = 0;
    this.or = new Or(0,0);
    this.and = new And(0,0);
    this.not = new Not(0,0);
    this.xor = new Xor(0,0);
    this.nand = new Nand(0,0);
    this.show_sidemenu();
    this.fieldobj = [];

    window.addEventListener("resize", e => {
      this.width = width / 5;
      this.show_sidemenu();
    });
    window.addEventListener("wheel", e => {
      console.log(e.deltaX, e.deltaY, e.deltaZ);
    });
  }
  show_sidemenu(){
    adjustScreenSize();
    this.width = width / 5;
    this.height = height;
    ctx.strokeRect(0,0,this.width,this.height);
    this.or.moveto(this.width/2, 100);
    this.and.moveto(this.width/2, 150);
    this.not.moveto(this.width/2, 200);
    this.xor.moveto(this.width/2, 250);
    this.nand.moveto(this.width/2, 300);
    this.or.draw();
    this.and.draw();
    this.not.draw();
    this.xor.draw();
    this.nand.draw();
  }
  get_nearobj(x,y){
    let dis_x = 0;
    let dis_y = 0;
    let handling_obj = null;
    let is_handling = false;
    this.fieldobj.forEach(elm => {

    // let handling_obj;
    // let is_handling = false;
    // let mouse_padding_x = 0;
    // let mouse_padding_y = 0;
    // let dis_x = Infinity;
    // let dis_y = Infinity;

    // this.obj.forEach(elm => {
    //   let pad_x = elm.x - x;
    //   let pad_y = elm.y - y;
    //   if(dis_x > Math.abs(pad_x) && dis_y > Math.abs(pad_y)){
    //     dis_x = Math.abs(pad_x);
    //     dis_y = Math.abs(pad_y);
    //     if(Math.abs(pad_x) < 30 && Math.abs(pad_y) < 20){
    //       handling_obj = elm;
    //       is_handling = true;
    //       mouse_padding_x = pad_x;
    //       mouse_padding_y = pad_y;
    //     }
    //   }
    });
  }
}

let display = new Display();