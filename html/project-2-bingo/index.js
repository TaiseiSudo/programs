const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

const BOXSIZE = 100;

let win_width = 0;
let win_height = 0;

function adjustScreenSize(){
  win_width = document.body.offsetWidth;
  win_height = document.body.offsetHeight;
  canvas.width = win_width;
  canvas.height = win_height;
}

function make_plate(){

}

function main(){
  adjustScreenSize();
  window.addEventListener("resize",function(){
    adjustScreenSize();
  });
  const start_pos_x = (win_width - BOXSIZE*5)/2;
  const start_pos_y = (win_height - BOXSIZE*6)/2;

  let num_check = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
  let num = 0;

  ctx.beginPath();
  ctx.font = "100px MS　ゴシック";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("B",start_pos_x + 50,start_pos_y + 50);
  ctx.fillText("I",start_pos_x + 150,start_pos_y + 50);
  ctx.fillText("N",start_pos_x + 250,start_pos_y + 50);
  ctx.fillText("G",start_pos_x + 350,start_pos_y + 50);
  ctx.fillText("O",start_pos_x + 450,start_pos_y + 50);

  for(let i = 0;i<5;i++){
    for(let j = 0;j<6;j++){
      let string = "";
      ctx.beginPath();
      ctx.strokeRect(start_pos_x + i*BOXSIZE,start_pos_y + j*BOXSIZE,BOXSIZE,BOXSIZE);
      if(j != 0){
        if(i == 2 && j == 3){
          string = "free";
        }
        else{
          do{
            num = Math.ceil(Math.random()*15);
          }while(num_check[num]);
          num_check[num] = true;
          num += i*15;
          string = num.toString();
        }
        ctx.font = "50px MS　ゴシック"
        ctx.fillText(string,start_pos_x + i*BOXSIZE + 50,start_pos_y + j*BOXSIZE + 50);
      }
    }
    num_check = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
  }
}

main();