class Circle{
  constructor(acceleration=[0,0],vecter=[0,0],pos=[0,0],mass=1,radius=5,e=1,air_resistance=0,is_gravity=true,is_attraction=false,is_reoulsion=false,is_collision=true,force=0){
    this.acceleration = acceleration;
    this.vecter = vecter;
    this.pos = pos;
    this.mass = mass;
    this.radius = radius;
    this.e = e;
    this.air_resistance = air_resistance;
    this.is_gravity = is_gravity;
    this.is_attraction = is_attraction;
    this.is_reoulsion = is_reoulsion;
    this.is_collision = is_collision;
    this.force = force;
    this.gravity = 10;
  }
  update(sec=0.0){
    this.acceleration[0] = - this.air_resistance/this.mass * this.vecter[0] * sec;
    if(this.is_gravity){
      this.acceleration[1] = - this.air_resistance/this.mass * this.vecter[1] * sec + this.gravity;
    } else {
      this.acceleration[1] = - this.air_resistance/this.mass * this.vecter[1] * sec;
    }
    this.vecter[0] += this.acceleration[0] * sec;
    this.vecter[1] += this.acceleration[1] * sec;
    this.pos[0] += this.vecter[0] * sec;
    this.pos[1] += this.vecter[1] * sec;
  }
  add_force(f=[0,0]){
    this.vecter[0] += f[0] / this.mass;
    this.vecter[1] += f[1] / this.mass;
  }
  add_impact(f=[0,0]){
    this.vecter[0] += f[0];
    this.vecter[1] += f[1];
  }
}

class Field{
  constructor(...objects){
    this.canvas = document.getElementById("screen");
    this.ctx = this.canvas.getContext("2d");
    this.objects = objects;
    this.canvas_width = document.body.offsetWidth;
    this.canvas_height = document.body.offsetHeight;
    this.canvas_half_width = this.canvas_width / 2;
    this.canvas_half_height = this.canvas_height / 2;
    this.adjustScreenSize()
    window.addEventListener("resize", this.adjustScreenSize.bind(this));
  }
  draw(){
    this.ctx.clearRect(-this.canvas_half_width,-this.canvas_half_height,this.canvas_width,this.canvas_height);
    this.objects.forEach((obj) => {
      this.ctx.beginPath();
      this.ctx.arc(obj.pos[0],obj.pos[1],obj.radius,0,Math.PI*2);
      this.ctx.fill();
    });
  }
  reflect(){
    const obj = this.objects;
    const len = obj.length;
    for(let i = 0; i < len; i++){
      for(let j = i + 1; j < len; j++){
        if(!(obj[i].is_collision && obj[j].is_collision)){
          continue;
        }

        const dis_x = obj[j].pos[0] - obj[i].pos[0];
        const dis_y = obj[j].pos[1] - obj[i].pos[1];
        const distance = Math.sqrt(dis_x**2 + dis_y**2);
        const lap = (obj[i].radius + obj[j].radius) - distance;

        if(lap < 0){
          continue;
        }

        const n = [dis_x / distance, dis_y / distance];
        const t = [dis_y / distance, -dis_x / distance];
        const v1_nsca = obj[i].vecter[0]*n[0] + obj[i].vecter[1]*n[1];
        const v1_tsca = obj[i].vecter[0]*t[0] + obj[i].vecter[1]*t[1];
        const v2_nsca = obj[j].vecter[0]*n[0] + obj[j].vecter[1]*n[1];
        const v2_tsca = obj[j].vecter[0]*t[0] + obj[j].vecter[1]*t[1];
        const v1_n = [n[0]*v1_nsca,n[1]*v1_nsca];
        const v1_t = [t[0]*v1_tsca,t[1]*v1_tsca];
        const v2_n = [n[0]*v2_nsca,n[1]*v2_nsca];
        const v2_t = [t[0]*v2_tsca,t[1]*v2_tsca];


        const v1_nsca_del = (obj[i].mass*v1_nsca + obj[j].mass*v2_nsca - obj[j].mass*(obj[i].e*obj[j].e)*(v1_nsca - v2_nsca)) / (obj[i].mass + obj[j].mass);
        const v2_nsca_del = (obj[i].mass*v1_nsca + obj[j].mass*v2_nsca + obj[j].mass*(obj[i].e*obj[j].e)*(v1_nsca - v2_nsca)) / (obj[i].mass + obj[j].mass);

        const v1_vecter_x = v1_t[0] + v1_nsca_del*n[0];
        const v1_vecter_y = v1_t[1] + v1_nsca_del*n[1];
        const v2_vecter_x = v2_t[0] + v2_nsca_del*n[0];
        const v2_vecter_y = v2_t[1] + v2_nsca_del*n[1];

        obj[i].vecter = [v1_vecter_x,v1_vecter_y];
        obj[j].vecter = [v2_vecter_x,v2_vecter_y];

        const k = (Math.sqrt(obj[i].acceleration[0]**2 + obj[i].acceleration[1]**2) + Math.sqrt(obj[j].acceleration[0]**2 + obj[j].acceleration[1]**2)) / 2;
        const force_x = -1 * k * lap * n[0];
        const force_y = -1 * k * lap * n[1];
        obj[i].add_force([force_x,force_y]);
        obj[j].add_force([-force_x,-force_y]);
      }

      const lap_w = Math.abs(obj[i].pos[0]) - (this.canvas_half_width - obj[i].radius);
      const lap_h = Math.abs(obj[i].pos[1]) - (this.canvas_half_height - obj[i].radius);
      const k = Math.sqrt(obj[i].acceleration[0]**2 + obj[i].acceleration[1]**2);

      if(lap_w > 0){
        obj[i].add_force([-lap_w*k,0]);
        if(Math.sign(obj[i].pos[0]) == Math.sign(obj[i].vecter[0])){
          obj[i].vecter[0] *= -obj[i].e;
        }
      }
      if(lap_h > 0){
        obj[i].add_force([0,-lap_h*k]);
        if(Math.sign(obj[i].pos[1]) == Math.sign(obj[i].vecter[1])){
          obj[i].vecter[1] *= -obj[i].e;
        }
      }
    }
  }
  update(sec=0.0){
    this.objects.forEach(obj => {
      obj.update(sec);
    });
  }
  adjustScreenSize(){
    this.canvas_width = document.body.offsetWidth;
    this.canvas_height = document.body.offsetHeight;
    this.canvas.width = this.canvas_width;
    this.canvas.height = this.canvas_height;
    this.canvas_half_width = this.canvas_width / 2;
    this.canvas_half_height = this.canvas_height / 2;
    this.ctx.translate(Math.ceil(this.canvas_half_width),Math.ceil(this.canvas_half_height));
  }
}

function main(){
  let objs = [];
  for(let i = 0; i < 10; i++){
    for(let j = 0; j < 30; j++){
      objs.push(new Circle([0,0],[0,0],[j*20 - 300 + (i%2)*10, i * 20 - 200],10,10,0.9,0,true,true,true,true));
    }
  }
  const field = new Field(...objs);
  let time = performance.now();

  setInterval(function(){
    const d_time = performance.now() - time;
    time = performance.now();

    field.update(d_time/80);
    field.reflect();
    field.draw();
  },0.001);
}

main()