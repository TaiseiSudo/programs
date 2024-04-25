const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;

let turn = 0;//0=null,1=he,2=me
turn = 2;

/* --filed--
ー８７６５４３２１０
０香桂銀金玉金銀桂香零
１＊飛＊＊＊＊＊角＊一
２歩歩歩歩歩歩歩歩歩二
３＊＊＊＊＊＊＊＊＊三
４＊＊＊＊＊＊＊＊＊四
５＊＊＊＊＊＊＊＊＊五
６歩歩歩歩歩歩歩歩歩六
７＊角＊＊＊＊＊飛＊七
８香桂銀金玉金銀桂香八

9-0 => player0の手持ち
9-1 => player1の手持ち
y
*/
function adjustScreenSize(){
  width = document.body.offsetWidth;
  height = document.body.offsetHeight;
  canvas.width = width;
  canvas.height = height;
}

class Piece{
  constructor(){
    this.id = 0;
    this.name = "";
    this.fcolor = "#000";
    this.bcolor = "#ea0";
    this.whohas = 0;//0=null,1=he,2=me
    this.canmove = [];
    this.status = "";
  }
  reset(id,whohas){
    this.id = id;
    this.whohas = whohas;
    switch(id){
      case 0:
        this.name = "";
        break;
      case 1:
        this.name = "王";
        this.canmove = [{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false}];
        break;
      case 2:
        this.name = "玉";
        this.canmove = [{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false}];
        break;
      case 3:
        this.name = "飛";
        this.canmove = [{ismove:false,isone:false},{ismove:true,isone:true},{ismove:false,isone:false},{ismove:true,isone:true},{ismove:true,isone:true},{ismove:false,isone:false},{ismove:true,isone:true},{ismove:false,isone:false}];
        break;
      case 4:
        this.name = "龍";
        this.fcolor = "#f00";
        this.canmove = [{ismove:true,isone:false},{ismove:true,isone:true},{ismove:true,isone:false},{ismove:true,isone:true},{ismove:true,isone:true},{ismove:true,isone:false},{ismove:true,isone:true},{ismove:true,isone:false}];
        break;
      case 5:
        this.name = "角";
        this.canmove = [{ismove:true,isone:true},{ismove:false,isone:false},{ismove:true,isone:true},{ismove:false,isone:false},{ismove:false,isone:false},{ismove:true,isone:true},{ismove:false,isone:false},{ismove:true,isone:true}];
        break;
      case 6:
        this.name = "馬";
        this.fcolor = "#f00";
        this.canmove = [{ismove:true,isone:true},{ismove:true,isone:false},{ismove:true,isone:true},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:true},{ismove:true,isone:false},{ismove:true,isone:true}];
        break;
      case 7:
        this.name = "金";
        this.canmove = [{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:false,isone:false},{ismove:true,isone:false},{ismove:false,isone:false}];
        break;
      case 8:
        this.name = "成";
        this.fcolor = "#f00";
        this.canmove = [{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:false,isone:false},{ismove:true,isone:false},{ismove:false,isone:false}];
        break;
      case 9:
        this.name = "銀";
        this.canmove = [{ismove:true,isone:false},{ismove:true,isone:false},{ismove:true,isone:false},{ismove:false,isone:false},{ismove:false,isone:false},{ismove:true,isone:false},{ismove:false,isone:false},{ismove:true,isone:false}];
        break;
      case 10:
        this.name = "桂";
        this.canmove = [{ismove:false,isone:true},{ismove:false,isone:false},{ismove:false,isone:true},{ismove:false,isone:false},{ismove:false,isone:false},{ismove:false,isone:false},{ismove:false,isone:false},{ismove:false,isone:false}];
        break;
      case 11:
        this.name = "香";
        this.canmove = [{ismove:false,isone:false},{ismove:true,isone:true},{ismove:false,isone:false},{ismove:false,isone:false},{ismove:false,isone:false},{ismove:false,isone:false},{ismove:false,isone:false},{ismove:false,isone:false}];
        break;
      case 12:
        this.name = "歩";
        this.canmove = [{ismove:false,isone:false},{ismove:true,isone:false},{ismove:false,isone:false},{ismove:false,isone:false},{ismove:false,isone:false},{ismove:false,isone:false},{ismove:false,isone:false},{ismove:false,isone:false}];
        break;
    }
  }
}

class Filed{
  constructor(){
    this.SQUARESIZE = Math.min(width,height)/12;
    this.field = [[...Array(9)],[...Array(9)],[...Array(9)],[...Array(9)],[...Array(9)],[...Array(9)],[...Array(9)],[...Array(9)],[...Array(9)]];
    this.field = this.field.map(e => e.map(f => {return new Piece()}));
    this.firstSet();
    window.addEventListener("click",e => this.clickField(e));
  }
  drawField(){
    this.SQUARESIZE = Math.min(width,height)/12;
    const start_x = (width + this.SQUARESIZE*9)/2;
    const start_y = (height - this.SQUARESIZE*9)/2;
    ctx.beginPath();
    ctx.fillStyle = "#4b6";
    ctx.fillRect(0,0,width,height);
    for(let i = 0;i < 9;i++){
      for(let j = 0;j < 9;j++){
        this.field[i][j].bcolor = (this.field[i][j].status == "select") ? "#fc5" : "#ea0";
        ctx.beginPath();
        ctx.fillStyle = this.field[i][j].bcolor;
        ctx.fillRect(start_x - (i+1)*this.SQUARESIZE,start_y + j*this.SQUARESIZE,this.SQUARESIZE,this.SQUARESIZE);
        ctx.strokeRect(start_x - (i+1)*this.SQUARESIZE,start_y + j*this.SQUARESIZE,this.SQUARESIZE,this.SQUARESIZE);
        ctx.fillStyle = this.field[i][j].fcolor;
        ctx.font = "bold " + Math.floor(this.SQUARESIZE/2) +"px MS Mincho";
        ctx.textAlign = "center";
        ctx.beginPath();
        if(this.field[i][j].whohas == 1){
          ctx.rotate(Math.PI);
          ctx.fillText(this.field[i][j].name,-(start_x - (i+1)*this.SQUARESIZE + this.SQUARESIZE/2),-(start_y + j*this.SQUARESIZE + this.SQUARESIZE/3));
          ctx.rotate(Math.PI);
        }else{
          ctx.fillText(this.field[i][j].name,start_x - (i+1)*this.SQUARESIZE + this.SQUARESIZE/2,start_y + j*this.SQUARESIZE + this.SQUARESIZE/1.5);
        }
      }
    }
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(start_x - 3*this.SQUARESIZE,start_y + 3*this.SQUARESIZE,3,0,Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(start_x - 3*this.SQUARESIZE,start_y + 6*this.SQUARESIZE,3,0,Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(start_x - 6*this.SQUARESIZE,start_y + 3*this.SQUARESIZE,3,0,Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(start_x - 6*this.SQUARESIZE,start_y + 6*this.SQUARESIZE,3,0,Math.PI*2);
    ctx.fill();
  }

  clickField(e){
    const start_x = (width - this.SQUARESIZE*9)/2;
    const start_y = (height - this.SQUARESIZE*9)/2;
    let x = 8 - Math.floor((e.pageX - start_x) / this.SQUARESIZE);
    let y = Math.floor((e.pageY - start_y) / this.SQUARESIZE);

    if(x<0||y<0||8<x||8<y){
      return;
    }

    this.resetstatus();
    this.checkfield(x,y);
    this.drawField();
    /*switch(y){
      case 0:
        y = "一";
        break;
      case 1:
        y = "二";
        break;
      case 2:
        y = "三";
        break;
      case 3:
        y = "四";
        break;
      case 4:
        y = "五";
        break;
      case 5:
        y = "六";
        break;
      case 6:
        y = "七";
        break;
      case 7:
        y = "八";
        break;
      case 8:
        y = "九";
        break;
    }*/
  }

  direction(i){
    let x = 0;
    let y = 0;

    switch(i){
      case 0:
        x = 1;
        y = -1;
        break;
      case 1:
        x = 0;
        y = -1;
        break;
      case 2:
        x = -1;
        y = -1;
        break;
      case 3:
        x = 1;
        y = 0;
        break;
      case 4:
        x = -1;
        y = 0;
        break;
      case 5:
        x = 1;
        y = 1;
        break;
      case 6:
        x = 0;
        y = 1;
        break;
      case 7:
        x = -1;
        y = 1;
        break;
      case 100:
        x = 1;
        y = -2;
        break;
      case 101:
        x = -1;
        y = -2;
        break;
    }
    if(turn == 1){
      x *= -1;
      y *= -1;
    }else if(turn == 0){
      return;
    }

    return [x,y];
  }

  checkfield(x,y){
    if(this.field[x][y].whohas != turn){
      return;
    }
    this.field[x][y].status = "click";
    for(let i = 0;i<8;i++){
      if(this.field[x][y].canmove[i].ismove){
        if(this.field[x][y].canmove[i].isone){
          let shiftX = x;
          let shiftY = y;
          breakpoint:
          do{
            shiftX += this.direction(i)[0];
            shiftY += this.direction(i)[1];
            switch(this.checkmove(shiftX,shiftY)){
              case 0:
                break breakpoint;
              case 1:
                this.field[shiftX][shiftY].status = "select";
                break;
              case 2:
                this.field[shiftX][shiftY].status = "select";
                break breakpoint;
            }
          }while(true);
        }else{
          switch(this.checkmove(x + this.direction(i)[0],y + this.direction(i)[1])){
            case 0:
              break;
            case 1:
              this.field[x + this.direction(i)[0]][y + this.direction(i)[1]].status = "select";
              break;
            case 2:
              this.field[x + this.direction(i)[0]][y + this.direction(i)[1]].status = "select";
              break;
          }
        }
      }else{
        for(let j = 0;j<2;j++){
          switch(this.checkmove(x + this.direction(100+j)[0],y + x + this.direction(100+j)[1])){
            case 0:
            case 1:
            case 2:
          }
        }
      }
    }
  }

  checkmove(x,y){ //0=>can't,1=>can,2=>end
    if(x<0||y<0||8<x||8<y){
      return 0;
    }
    if(this.field[x][y].whohas == turn){
      return 0;
    }else if(this.field[x][y].name == ""){
      return 1;
    }else if(Math.abs(this.field[x][y].whohas) == 1){
      return 2;
    }
  }

  resetstatus(){
    for(let i = 0;i<9;i++){
      for(let j = 0;j<9;j++){
        this.field[i][j].status = "";
      }
    }
  }

  firstSet(){
    this.field[8][0].reset(11,1); this.field[7][0].reset(10,1); this.field[6][0].reset(9,1);  this.field[5][0].reset(7,1);  this.field[4][0].reset(1,1);  this.field[3][0].reset(7,1);  this.field[2][0].reset(9,1);  this.field[1][0].reset(10,1); this.field[0][0].reset(11,1);
    this.field[8][1].reset(0,0);  this.field[7][1].reset(3,1);  this.field[6][1].reset(0,0);  this.field[5][1].reset(0,0);  this.field[4][1].reset(0,0);  this.field[3][1].reset(0,0);  this.field[2][1].reset(0,0);  this.field[1][1].reset(5,1);  this.field[0][1].reset(0,0);
    this.field[8][2].reset(12,1); this.field[7][2].reset(12,1); this.field[6][2].reset(12,1); this.field[5][2].reset(12,1); this.field[4][2].reset(12,1); this.field[3][2].reset(12,1); this.field[2][2].reset(12,1); this.field[1][2].reset(12,1); this.field[0][2].reset(12,1);
    this.field[8][3].reset(0,0);  this.field[7][3].reset(0,0);  this.field[6][3].reset(0,0);  this.field[5][3].reset(0,0);  this.field[4][3].reset(0,0);  this.field[3][3].reset(0,0);  this.field[2][3].reset(0,0);  this.field[1][3].reset(0,0);  this.field[0][3].reset(0,0);
    this.field[8][4].reset(0,0);  this.field[7][4].reset(0,0);  this.field[6][4].reset(0,0);  this.field[5][4].reset(0,0);  this.field[4][4].reset(0,0);  this.field[3][4].reset(0,0);  this.field[2][4].reset(0,0);  this.field[1][4].reset(0,0);  this.field[0][4].reset(0,0);
    this.field[8][5].reset(0,0);  this.field[7][5].reset(0,0);  this.field[6][5].reset(0,0);  this.field[5][5].reset(0,0);  this.field[4][5].reset(0,0);  this.field[3][5].reset(0,0);  this.field[2][5].reset(0,0);  this.field[1][5].reset(0,0);  this.field[0][5].reset(0,0);
    this.field[8][6].reset(12,2); this.field[7][6].reset(12,2); this.field[6][6].reset(12,2); this.field[5][6].reset(12,2); this.field[4][6].reset(12,2); this.field[3][6].reset(12,2); this.field[2][6].reset(12,2); this.field[1][6].reset(12,2); this.field[0][6].reset(12,2);
    this.field[8][7].reset(0,0);  this.field[7][7].reset(5,2);  this.field[6][7].reset(0,0);  this.field[5][7].reset(0,0);  this.field[4][7].reset(0,0);  this.field[3][7].reset(0,0);  this.field[2][7].reset(0,0);  this.field[1][7].reset(3,2);  this.field[0][7].reset(0,0);
    this.field[8][8].reset(11,2); this.field[7][8].reset(10,2); this.field[6][8].reset(9,2);  this.field[5][8].reset(7,2);  this.field[4][8].reset(2,2);  this.field[3][8].reset(7,2);  this.field[2][8].reset(9,2);  this.field[1][8].reset(10,2); this.field[0][8].reset(11,2);
  }
}

function main(){
  adjustScreenSize();
  let fie = new Filed();
  fie.drawField();
  window.addEventListener("resize",function(){
    adjustScreenSize();
    fie.drawField();
  })
}

main();