const n = 4;
let buf = 0;
let a = [[1,2,0,-1],[-1,1,2,0],[2,0,1,1],[1,-2,-1,1]];
let ia = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
for(let i = 0; i < n; i++){
  buf = 1/a[i][i];
  for(let j = 0; j < n; j++){
    a[i][j]*=buf;
    ia[i][j]*=buf;
  }
  for(let j = 0; j < n; j++){
    if(i!=j){
      buf = a[j][i];
      for(let k = 0; k < n; k++){
        a[j][k] -= a[i][k]*buf;
        ia[j][k] -= ia[i][k]*buf;
      }
    }
  }
}

console.log(ia);