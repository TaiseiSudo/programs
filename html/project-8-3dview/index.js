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

class Matrix{
  //n行m列の配列を作成、argsに配列を指定できる
  constructor(n,m,...args){
    this.matrix = [];
    this.n = n;
    this.m = m;
    //argsに指定がなければ単位行列を作成
    if(args.length == 0){
      for(let i = 0; i < n; i++){
        this.matrix.push([]);
        for(let j = 0; j < m; j++){
          if(i == j){
            this.matrix[i].push(1);
          }else{
            this.matrix[i].push(0);
          }
        }
      }
    //argsの要素数がn行m列分指定されていれば行列に格納
    }else if(args.length == n*m){
      for(let i = 0; i < n; i++){
        this.matrix.push([]);
        for(let j = 0; j < m; j++){
          this.matrix[i].push(args[this.m*i+j]);
        }
      }
    //要素数が合わなければエラーを吐く
    }else{
      throw new Error("Matrix>constructor>wrong number of arguments!");
    }
  }
  //行列の足し算
  static add(mat_1,mat_2){
    let ans = new Matrix(0,0);
    for(let i = 0; i < mat_1.matrix.length; i++){
      ans.matrix.push([]);
      for(let j = 0; j < mat_1.matrix[i].length; j++){
        ans.matrix[i].push(mat_1.matrix[i][j] + mat_2.matrix[i][j]);
      }
    }
    return ans;
  }
  //行列の引き算
  static sub(mat_1,mat_2){
    let ans = new Matrix(0,0);
    for(let i = 0; i < mat_1.matrix.length; i++){
      ans.matrix.push([]);
      for(let j = 0; j < mat_1.matrix[i].length; j++){
        ans.matrix[i].push(mat_1.matrix[i][j] - mat_2.matrix[i][j]);
      }
    }
    return ans;
  }
  //行列の内積
  static dot(mat_1,mat_2){
    let ans = 0;
    for(let i = 0; i < mat_1.matrix.length; i++){
      for(let j = 0; j < mat_1.matrix[i].length; j++){
        ans += mat_1.matrix[i][j] * mat_2.matrix[i][j];
      }
    }
    return ans;
  }
  //行列の外積
  static cross(mat_1,mat_2){
    let ans = new Matrix(0,0);
    // for(let i = 0; i < mat_1.matrix.length; i++){
    //   ans.matrix.push([]);
    //   for(let j = 0; j < mat_2.matrix[0].length; j++){
    //     // const lis_a = mat_1.matrix[i];
    //     // const lis_b = mat_2.matrix[0].map((_, c) => mat_2.matrix.map(r => r[c]))[j];
    //     // const mat_a = new Matrix(1,lis_a.length,...lis_a);
    //     // const mat_b = new Matrix(1,lis_b.length,...lis_b);
    //     // ans.matrix.push(Matrix.dot(mat_a,mat_b));
    //     // ans.matrix[i].push(Matrix.dot(mat_a,mat_b));
    //     ans.matrix[i].push(Matrix.dot(mat_1,mat_2));
    //   }
    // }
    const mat_2_rev = Matrix.reverse(mat_2);
    for(let i = 0; i < mat_1.matrix.length; i++){
      ans.matrix.push([]);
      for(let j = 0; j < mat_2_rev.matrix.length; j++){
        const mat_a = new Matrix(1,mat_1.m,...mat_1.matrix[i].flat());
        const mat_b = new Matrix(1,mat_2_rev.m,...mat_2_rev.matrix[j].flat());

        ans.matrix[i].push(Matrix.dot(mat_a,mat_b));
      }
    }
    return ans;
  }
  //行列のスカラー倍
  static scolar(mat_1,scolar){
    let ans = new Matrix(0,0);
    for(let i = 0; i < mat_1.matrix.length; i++){
      ans.matrix.push([]);
      for(let j = 0; j < mat_1.matrix[i].length; j++){
        ans.matrix[i].push(mat_1.matrix[i][j]*scolar);
      }
    }
    return ans;
  }
  //行列の正規化
  static normalize(mat_1){
    const norm = Math.sqrt(Matrix.dot(mat_1,mat_1));
    let ans = new Matrix(0,0);
    for(let i = 0; i < mat_1.matrix.length; i++){
      ans.matrix.push([]);
      for(let j = 0; j < mat_1.matrix[i].length; j++){
        ans.matrix[i].push(mat_1.matrix[i][j]/norm);
      }
    }
    return ans;
  }
  //逆行列の生成
  static inverse(mat){
    const n = mat.matrix.length;
    let one = new Matrix(n,n,...mat.matrix);
    let ans = new Matrix(n,n);
    let buf = 0;

    for(let i = 0; i < n; i++){
      buf = 1/mat.matrix[i][i];
      for(let j = 0; j < n; j++){
        ans.matrix[i][j] *= buf;
        one.matrix[i][j] *= buf;
      }
      for(let j = 0; j < n; j++){
        if(i != j){
          buf = a[j][i];
          for(let k = 0; k < n; k++){
            ans.matrix[j][k] -= ans[i][k]*buf;
            one.matrix[j][k] -= one[i][k]*buf;
          }
        }
      }
    }
    return ans;
  }
  //行列式の導出
  static determinant(mat){
    const n = mat.matrix.length;
    let one = new Matrix(n,n,...mat.matrix.flat());
    let ans = 1;
    let buf = 0;

    for(let i = 0; i < n; i++){
      for(let j = 0; j < n; j++){
        if(i<j){
          buf = one.matrix[j][i]/one.matrix[i][i];
          for(let k = 0; k < n; k++){
            one.matrix[j][k] -= one.matrix[i][k]*buf;
          }
        }
      }
    }
    for(let i = 0; i < n; i++){
      ans *= one.matrix[i][i];
    }
    return ans;
  }
  static reverse(mat){
    const mat_rev =  mat.matrix[0].map((_, c) => mat.matrix.map(r => r[c]));
    const ans = new Matrix(mat_rev.length,mat_rev[0].length,...mat_rev.flat());

    return ans;
  }
}

class Field{
  constructor(){
    this.blocks = [];
    this.player = new Matrix(4,4);
    this.player.matrix[0][0] *= 200;
    this.player.matrix[1][1] *= 200;
    //this.player.matrix[2][2] *= 200;
    //this.player.matrix[0][3] += 10000;
    //this.player.matrix[1][3] += 100;
    //this.player.matrix[2][3] += 100;
    for(let x = 0; x < 32; x++){
      this.blocks.push([]);
      for(let y = 0; y < 8; y++){
        this.blocks[x].push([]);
        for(let z = 0; z < 32; z++){
          // if(y <= 1){
          //   this.blocks[x][y].push(1);
          // } else if(y == 2){
          //   this.blocks[x][y].push(2);
          // } else{
          //   this.blocks[x][y].push(0);
          // }
          this.blocks[x][y].push(0);
          if(x == 16 && y == 4 && z == 16){
            this.blocks[x][y][z] = 1;
          }
        }
      }
    }
    window.addEventListener("keydown", e => {
      switch(e.key){
        case "w":
          this.player.matrix[2][3] -= 1;
          break;
        case "s":
          this.player.matrix[2][3] += 1;
          break;
        case "a":
          this.player.matrix[0][3] -= 100;
          break;
        case "d":
          this.player.matrix[0][3] += 100;
          break;
        case "q":
          this.player.matrix[1][3] += 100;
          break;
        case "e":
          this.player.matrix[1][3] -= 100;
          break;
        case "ArrowUp":
          this.player.matrix[1][3] += 100;
      }
      ctx.clearRect(-width/2,-height/2,width,height);
      this.draw();
    });
  }
  draw(){
    const zoom = 2;
    const faces = [
      [[0,0,0],[1,0,0],[1,1,0],[0,1,0]],
      [[0,0,0],[0,0,1],[0,1,1],[0,1,0]],
      [[0,0,0],[1,0,0],[1,0,1],[0,0,1]],
      [[1,1,1],[0,1,1],[0,0,1],[1,0,1]],
      [[1,1,1],[1,1,0],[1,0,0],[1,0,1]],
      [[1,1,1],[0,1,1],[0,1,0],[1,1,0]]
    ];
    for(let x = 0; x < this.blocks.length; x++){
      for(let y = 0; y < this.blocks[x].length; y++){
        for(let z = 0; z < this.blocks[x][y].length; z++){
          if(this.blocks[x][y][z] == 1){
            for(let i = 0; i < faces.length; i++){
              let pos_0 = new Matrix(4,1,faces[i][0][0]+x,faces[i][0][1]+y,faces[i][0][2]+z,1);
              let pos_1 = new Matrix(4,1,faces[i][1][0]+x,faces[i][1][1]+y,faces[i][1][2]+z,1);
              let pos_2 = new Matrix(4,1,faces[i][2][0]+x,faces[i][2][1]+y,faces[i][2][2]+z,1);
              let pos_3 = new Matrix(4,1,faces[i][3][0]+x,faces[i][3][1]+y,faces[i][3][2]+z,1);
              // pos_0 = Matrix.cross(pos_0,this.player);
              // pos_1 = Matrix.cross(pos_1,this.player);
              // pos_2 = Matrix.cross(pos_2,this.player);
              // pos_3 = Matrix.cross(pos_3,this.player);
              pos_0 = Matrix.cross(this.player,pos_0);
              pos_1 = Matrix.cross(this.player,pos_1);
              pos_2 = Matrix.cross(this.player,pos_2);
              pos_3 = Matrix.cross(this.player,pos_3);
              ctx.beginPath();
              ctx.moveTo(zoom*pos_0.matrix[0][0]/pos_0.matrix[2][0],zoom*pos_0.matrix[1][0]/pos_0.matrix[2][0]);
              ctx.lineTo(zoom*pos_1.matrix[0][0]/pos_1.matrix[2][0],zoom*pos_1.matrix[1][0]/pos_1.matrix[2][0]);
              ctx.lineTo(zoom*pos_2.matrix[0][0]/pos_2.matrix[2][0],zoom*pos_2.matrix[1][0]/pos_2.matrix[2][0]);
              ctx.lineTo(zoom*pos_3.matrix[0][0]/pos_3.matrix[2][0],zoom*pos_3.matrix[1][0]/pos_3.matrix[2][0]);
              ctx.lineTo(zoom*pos_0.matrix[0][0]/pos_0.matrix[2][0],zoom*pos_0.matrix[1][0]/pos_0.matrix[2][0]);
              ctx.stroke();
              console.log(pos_0.matrix[0],pos_1.matrix[0],pos_2.matrix[0],pos_3.matrix[0]);
            }
          }
        }
      }
    }
  }
}

adjustScreenSize();
const a = new Field();
a.draw();