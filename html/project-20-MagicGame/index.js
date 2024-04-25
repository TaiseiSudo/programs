

class Display {
  constructor() {
    const canvas = document.getElementById("screen");
    const ctx = canvas.getContext("2d");

    this.width = 0;
    this.height = 0;

    this.objects = [];
    this.icons = [];
  }
  adjustScreenSize(){
    this.width = document.body.offsetWidth;
    this.height = document.body.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.translate(Math.ceil(width/2),Math.ceil(height/2));
  }

  add_object(object) {
    this.objects.push(object);
  }

  remove_object(elm) {
    const index = -1;
    if(typeof elm === "Number") {
      index = elm;
    } else if(typeof elm === "Object") {
      
    }
    this.objects.splice(index);
  }

  add_icons(icon) {
    this.icons.push(icons);
  }

  remove_icons(index) {
    this.icons.splice(index);
  }

  draw_objects() {

  }
}

class Object {
  constructor(is_collider = false,object_type = "box", object_color = "#ffffff", collider_size = 1, collider_type = "box") {
    this.x = 0;
    this.y = 0;
    this.is_collider = is_collider;
    this.object_type = object_type;
    this.object_color = object_color;
    this.collider_size = collider_size;
    this.collider_type = collider_type;
  }

  set_position(x,y) {
    this.x = x;
    this.y = y;
  }

  get_position() {
    return [x,y];
  }

  get_collider() {
    const collider = {
      "collider_size": this.collider_size,
      "collider_type": this.collider_type}

    return this.is_collider ? collider : null;
  }
}

class Character extends Object{
  constructor(hp, mp, def, res, vit, pie, atk, int, agi, pv, dex, hit, per, ler, exp, lv, luk) {
    super();
    this.hp = hp;
    this.mp = mp;
    this.def = def;
    this.res = res;
    this.vit = vit;
    this.pie = pie;
    this.atk = atk;
    this.int = int;
    this.agi = agi;
    this.pv = pv;
    this.dex = dex;
    this.hit = hit;
    this.per = per;
    this.ler = ler;
    this.exp = exp;
    this.lv = lv;
    this.luk = luk;
  }
}