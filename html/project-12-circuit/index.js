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
  constructor(x,y,output){
    this.x = x;
    this.y = y;
    this.output = output;
  }
  moveto(x,y){
    this.x = x;
    this.y = y;
  }
}

class And extends Gate{
  show(){
    ctx.beginPath();
    ctx.moveTo(this.x - 30, this.y - 20);
    ctx.arc(this.x + 10, this.y, 20, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(this.x - 30, this.y + 20);
    ctx.lineTo(this.x - 30, this.y -20);
    ctx.stroke();
  }
}
class Or extends Gate{
  show(){
    ctx.beginPath();
    ctx.moveTo(this.x -30, this.y - 20);
    ctx.quadraticCurveTo(this.x + 20, this.y - 25,this.x + 30, this.y);
    ctx.quadraticCurveTo(this.x + 20, this.y + 25, this.x - 30, this.y + 20);
    ctx.lineTo(this.x - 30, this.y + 20);
    ctx.quadraticCurveTo(this.x - 5, this.y, this.x - 30, this.y - 20);
    ctx.stroke();
  }
}
class Not extends Gate{
  show(){
    ctx.beginPath();
    ctx.arc(this.x + 33, this.y, 3, 0, Math.PI * 2);
    ctx.stroke();
  }
}

class Field{
  constructor(){
    this.obj = [];
    this.is_click = false;
    this.is_btnpress = false;
    this.is_handling = false;
    this.handling_obj = null;
    this.mouse_padding_x = 0;
    this.mouse_padding_y = 0;
    window.addEventListener("mousedown", e => {
      this.is_btnpress = true;
      this.is_click = true;
      const result = this.get_nearobj(e.clientX, e.clientY);
      if (result){
        [this.handling_obj, this.mouse_padding_x, this.mouse_padding_y] = [...result];
        this.is_handling = true;
      }
    })
    window.addEventListener("contextmenu", e => {
      console.log("right click");
      return false;
    });
    window.oncontextmenu = () => false;
    window.addEventListener("mouseup", e => {
      if(this.is_click){
        if(this.is_handling){
          if(this.handling_obj.constructor.name == "And"){
            this.obj[this.obj.indexOf(this.handling_obj)] = new Or(this.handling_obj.x, this.handling_obj.y, this.handling_obj.output);
          } else if(this.handling_obj.constructor.name == "Or"){
            this.obj[this.obj.indexOf(this.handling_obj)] =  new And(this.handling_obj.x, this.handling_obj.y, this.handling_obj.output);
          }
          this.show();
        }
        this.is_click = false;
      }
      this.is_btnpress = false;
      this.is_handling = false;
      this.handling_obj = null;
    });
    window.addEventListener("mousemove", e => {
      //つかむオブジェクトを決定する
      //モードを変更して移動できるようにする
      //距離を測る>つかむオブジェクトを固定する>固定されている間は座標を変え続ける
      this.is_click = false;
      if(this.is_btnpress && this.is_handling){
        this.handling_obj.x = this.mouse_padding_x + e.clientX;
        this.handling_obj.y = this.mouse_padding_y + e.clientY;
        this.show();
      }
    });
  }
  add_obj(obj){
    this.obj.push(obj);
  }
  show(){
    ctx.clearRect(0,0,height,width);
    this.obj.forEach(elm => {
      elm.show();
    });
  }
  get_nearobj(x, y){
    let handling_obj;
    let is_handling = false;
    let mouse_padding_x = 0;
    let mouse_padding_y = 0;
    let dis_x = Infinity;
    let dis_y = Infinity;

    this.obj.forEach(elm => {
      let pad_x = elm.x - x;
      let pad_y = elm.y - y;
      if(dis_x > Math.abs(pad_x) && dis_y > Math.abs(pad_y)){
        dis_x = Math.abs(pad_x);
        dis_y = Math.abs(pad_y);
        if(Math.abs(pad_x) < 30 && Math.abs(pad_y) < 20){
          handling_obj = elm;
          is_handling = true;
          mouse_padding_x = pad_x;
          mouse_padding_y = pad_y;
        }
      }
    });

    const result = (is_handling ? [handling_obj, mouse_padding_x, mouse_padding_y] : null);
    return result;
  }
}

function main(){
  adjustScreenSize();
  let stage = new Field();
  stage.add_obj(new And(100,100,null));
  stage.show();
}

main();