const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

class Field{
  constructor(n,m){
    this.pause = true;
    this.keypress = false;
    this.width = 0;
    this.height = 0;
    this.n = n;
    this.m = m;
    this.field = [];
    for(let i = 0; i < n; i++){
      this.field.push(new Array(m).fill(0))
    }
    this.adjustScreenSize();
    window.addEventListener("resize",this.adjustScreenSize.bind(this));
    window.addEventListener("keydown", (e) => {
      if(e.code == "Space"){
        this.pause = !this.pause;
      }
    });
    window.addEventListener("mousedown", (e) => {
      this.keypress = true;
    });
    window.addEventListener("mouseup", (e) => {
      this.keypress = false;
    });
    window.addEventListener("mousemove", (e) => {
      if(!this.pause && this.keypress){
        const x = e.clientX;
        const y = e.clientY;
        const offset_x = (this.width / 2) + this.x_start;
        const offset_y = (this.height / 2) + this.y_start;
        const n = Math.floor((x - offset_x) / this.cell_len);
        const m = Math.floor((y - offset_y) / this.cell_len);

        if(0 <= n && n < this.n && 0 <= m && m < this.m){
          this.field[n][m] = 1;
        }
        this.show();
      }
    });
  }

  adjustScreenSize(){
    this.width = document.body.offsetWidth;
    this.height = document.body.offsetHeight;
    canvas.width = this.width;
    canvas.height = this.height;
    ctx.translate(Math.ceil(this.width/2),Math.ceil(this.height/2));

    const margin = Math.min(this.width,this.height) / 10;
    this.cell_len = Math.min((this.height - margin) / this.n, (this.width - margin) / this.m);
    const cells_w = this.cell_len * this.m;
    const cells_h = this.cell_len * this.n;
    this.x_start = -1 * cells_w / 2;
    this.y_start = -1 * cells_h / 2;

    this.show();
  }

  step(){
    let new_field = [];
    for(let i = 0; i < this.n; i++){
      new_field.push(new Array(this.m).fill(0))
    }
    const direction = [
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1]
    ];

    for(let i = 0; i < this.n; i++){
      for(let j = 0; j < this.m; j++){
        let n = 0;
        for(let k = 0; k < direction.length; k++){
          const dir = [i + direction[k][0], j + direction[k][1]];
          if(0 <= dir[0] && dir[0] < this.n && 0 < dir[1] && dir[1] < this.m){
            n += this.field[dir[0]][dir[1]];
          }
        }
        if(this.field[i][j] == 0){
          if(n == 3){
            new_field[i][j] = 1;
          }
        } else {
          if(n <= 1){
            new_field[i][j] = 0;
          } else if(n >= 4){
            new_field[i][j] = 0;
          } else {
            new_field[i][j] = 1;
          }
        }
      }
    }

    this.field = new_field;
  }

  show(){
    ctx.clearRect(-this.width/2, -this.height/2, this.width, this.height);

    for(let i = 0; i < this.n; i++){
      for(let j = 0; j < this.m; j++){
        if(this.field[i][j] == 0){
          ctx.strokeRect(this.x_start + this.cell_len * i, this.y_start + this.cell_len * j, this.cell_len, this.cell_len);
        } else {
          ctx.fillRect(this.x_start + this.cell_len * i, this.y_start + this.cell_len * j, this.cell_len, this.cell_len);
        }
      }
    }
  }

  loop(sec){
    if(this.pause){
      this.step();
    }
    this.show();
    setTimeout(this.loop.bind(this),sec,sec);
  }
}

function main(){
  let stage = new Field(100,100);

  stage.loop(10);
}

main();