const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;

class Ex{
  constructor(){}
  static adjustScreenSize(){
    width = document.body.offsetWidth;
    height = document.body.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.translate(Math.ceil(width/2),Math.ceil(height/2));
  }
  static HSVtoRGB(H,S,V){
    H %= 360;
    S = (S > 100) ? (S % 100) : S;
    V = (V > 100) ? (V % 100) : V;
    const _H = (H/60)%1;
    const _S = S/100;
    const _V = V/100;
    const A = _V * 255;
    const B = _V * (1 - _S) * 255;
    const C = _V * (1 - (_S * _H)) * 255;
    const D = _V * (1 - (_S * (1 - _H))) * 255;
    const _A = ("0" + Math.floor(A).toString(16)).slice(-2);
    const _B = ("0" + Math.floor(B).toString(16)).slice(-2);
    const _C = ("0" + Math.floor(C).toString(16)).slice(-2);
    const _D = ("0" + Math.floor(D).toString(16)).slice(-2);
    let hash = "";

    if(_S == 0){
      hash = "#" + _A + _A + _A;
    } else if(H < 60){
      hash = "#" + _A + _D + _B;
    } else if(H < 120){
      hash = "#" + _C + _A + _B;
    } else if(H < 180){
      hash = "#" + _B + _A + _D;
    } else if(H < 240){
      hash = "#" + _B + _C + _A;
    } else if(H < 300){
      hash = "#" + _D + _B + _A;
    } else if(H < 360){
      hash = "#" + _A + _B + _C;
    }

    return hash;
  }
  static makeColorList(n,s=60,v=90){
    let color_list = new Array(n);
    for(let i = 0; i < n; i++){
      color_list[i] = this.HSVtoRGB((360/n)*i,s,v);
    }
    return color_list;
  }
  static cubicBezier(t,...points){
    const n = points.length / 2;
    if(n == 2){
      return this.linearEquation(t,points[0],points[1],points[2],points[3]);
    } else if(points.length > 2){
      let new_points = [];
      for(let i = 0; i < n - 1; i++){
        new_points.push(...this.linearEquation(t,points[i*2],points[i*2+1],points[i*2+2],points[i*2+3]))
      }
      return this.cubicBezier(t,...new_points);
    }
  }
  static linearEquation(t,x1,y1,x2,y2){
    if(x1 == x2 && y1 == y2){
      return [x1,y1];
    }
    const d = x2 - x1;
    if(d == 0){
      const y = y1 + (y2 - y1) * t;
      return [x1,y];
    }
    const a = (y2 - y1) / d;
    const b = ((x2 * y1) - (x1 * y2)) / d;
    const x = x1 + (d * t);
    const y = (a * x) + b;

    return [x,y];
  }
  static fact(n){
    let f = 1;
    for(let i = 0; i < n; i++){
      f *= (i+1);
    }
    return f;
  }
  static gcd(x,y){
    let z = x % y;
    return z ? gcd(y,z) : y;
  }
}

class Pie{
  constructor(pearent,data,width=300,height=300){
    this.content = document.createElement("div");
    this.text = document.createElement("span");
    this.data = data;
    this.values = Object.values(data);
    this.keys = Object.keys(data);
    this.n = this.values.length;
    this.colors = Ex.makeColorList(this.n);
    this.flag = true;
    this.width = width;
    this.height = height;

    this.content.setAttribute("class","pie");
    this.content.setAttribute("id","pie");

    let pie_text = document.createElement("span");
    pie_text.setAttribute("class","pie-text");
    pie_text.setAttribute("id","pie-text");

    let pie_text_title = document.createElement("span");
    pie_text_title.setAttribute("class","pie-text-inner");
    pie_text_title.setAttribute("id","pie-text-title");
    pie_text_title.innerHTML = "収入";

    let pie_text_warper = document.createElement("span");

    this.text.setAttribute("class","pie-text-inner");
    this.text.setAttribute("id","pie-text-content");

    let pie_text_unit = document.createElement("span");
    pie_text_unit.setAttribute("class","pie-text-inner");
    pie_text_unit.setAttribute("id","pie-text-unit");
    pie_text_unit.innerHTML = "円";

    pie_text_warper.appendChild(this.text);
    pie_text_warper.appendChild(pie_text_unit);
    pie_text.appendChild(pie_text_title);
    pie_text.appendChild(pie_text_warper);
    this.content.appendChild(pie_text);

    pearent.appendChild(this.content);

    this.changePie();
  }
  changePie(){
    const sum = this.values.reduce((sum, item) => sum + item,0);
    if(this.flag){
      this.changePieAnimator(sum,100)
    }
  }
  changePieAnimator(sum,times,n=0){
    this.flag = false;
    const scale = Ex.cubicBezier(n/times,0,0,1,0,0,1,1,1)[1];
    let background_image = "radial-gradient(#e0e0e0 50%, transparent 50%), conic-gradient(";
    let start = 0;
    let end = 0;
    for(let i = 0; i < this.n; i++){
      start = end;
      end += this.values[i]*scale;
      // background_image += color_list[i] + " " + ((start / sum)*100).toString() + "% " + ((end / sum)*100).toString() + "%, ";
      background_image += this.colors[i] + " " + ((start / sum)*100).toString() + "% " + ((end / sum)*100 - 0.2).toString() + "%, ";
      background_image += "#fff " + ((end / sum)*100 - 0.2).toString() + "% " + ((end / sum)*100).toString() + "%, ";
    }
    background_image += "#ccc " + ((end / sum)*100).toString() + "% 100%)";
    this.content.style.setProperty("background-image", background_image);
    this.text.innerHTML = ((sum*scale).toFixed(1)).toString();
    if(n < times){
      setTimeout(this.changePieAnimator.bind(this),1,sum,times,++n);
    } else {
      this.flag = true;
    }
  }
  addElm(key,value){
    this.data[key] = value;
    this.changePie();
  }
  changeElm(key,value){
    this.data[key] = value;
    this.changePie();
  }
}

class Line{
  constructor(pearent,x,data,thema,width=300,height=300){
    this.content = document.createElement("div");
    this.svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    this.data = data;
    this.keys = Object.keys(this.data);
    this.values = Object.values(this.data);
    this.n = this.keys.length;
    this.colors = Ex.makeColorList(this.n);
    this.x = x;
    this.width = width;
    this.height = height;
    this.max = 1000;

    this.content.setAttribute("class","box");

    let title = document.createElement("span");
    title.setAttribute("class","title");
    title.innerHTML = thema;

    this.svg.setAttribute("class","graph");
    this.svg.setAttribute("id","graph");

    this.content.appendChild(title);
    this.content.appendChild(this.svg);

    pearent.appendChild(this.content);

    this.makeLine();
    this.changeLine();
  }
  clearLine(){
    const len = this.svg.children.length;
    for(let i = 0; i < len; i++){
      this.svg.children[0].remove();
    }
  }
  makeLine(){
    this.clearLine();
    const w = this.width - (16*2);
    const h = this.height - (16*2 + 24*2);

    for(let i = 0; i < this.n; i++){
      const value = this.values[i];
      const line = document.createElementNS("http://www.w3.org/2000/svg","polyline");
      line.setAttributeNS(null,"points","");
      // line.setAttributeNS(null,"style", "fill:" + this.colors[i] + "a0;stroke:#ccc;stroke-width:1;fill-rule:nonzero;");
      line.setAttributeNS(null,"style", "stroke:" + this.colors[i] + ";fill:none;stroke-width:5;");

      // this.addLinePoints(line,((1)/(this.x.length))*w,h);

      for(let j = 0; j < value.length; j++){
        // this.addLinePoints(line,((j+1)/(this.x.length))*w,(1 - value[j]/this.max)*h);
        // this.addLinePoints(line,((j)/(this.x.length-2))*w,(1 - value[j]/this.max)*h);
        this.addLinePoints(line,((j)/(this.x.length-2))*w,h);
      }

      // this.addLinePoints(line,((value.length)/(this.x.length))*w,h);

      this.svg.appendChild(line);
    }
  }
  addLinePoints(line,x,y){
    line.points.appendItem(this.svg.createSVGPoint());
    const last = line.points.length - 1;
    line.points[last]["x"] = x;
    line.points[last]["y"] = y;
  }
  changeLine(){
    this.max = Math.max(...this.values.flat())*1.2;
    for(let i = 0; i < this.svg.children.length; i++){
      const line = this.svg.children[i];
      const value = this.values[i];
      this.changeLineAnimator(line,value,100);
    }
  }
  changeLineAnimator(line,value,times,n=0){
    const h = this.height - (16*2 + 24*2);
    const scale = Ex.cubicBezier(n/times,0,0,1,0,0,1,1,1)[1];
    // for(let i = 0; i < line.points.length - 2; i++){
    for(let i = 0; i < line.points.length; i++){
      // line.points[i + 1]["y"] = (1 - ((value[i]*scale)/this.max))*h;
      line.points[i]["y"] = (1 - ((value[i]*scale)/this.max))*h;
    }
    if(n < times){
      setTimeout(this.changeLineAnimator.bind(this),1,line,value,times,++n);
    }
  }
}

class Bar{
  constructor(pearent,x,data,thema,width=300,height=300){
    this.content = document.createElement("div");
    this.svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    this.data = data;
    this.keys = Object.keys(this.data);
    this.values = Object.values(this.data);
    this.n = this.keys.length;
    this.colors = Ex.makeColorList(this.n);
    this.x = x;
    this.width = width;
    this.height = height;
    this.max = 1000;

    this.content.setAttribute("class","box");

    let title = document.createElement("span");
    title.setAttribute("class","title");
    title.innerHTML = thema;

    this.svg.setAttribute("class","graph");
    this.svg.setAttribute("id","graph");

    this.content.appendChild(title);
    this.content.appendChild(this.svg);

    pearent.appendChild(this.content);

    this.makeBar();
    this.changeBar();
  }
  clearBar(){
    const len = this.svg.children.length;
    for(let i = 0; i < len; i++){
      this.svg.children[0].remove();
    }
  }
  calcMax(){
    let ans = 0;
    for(let i = 0; i < this.x.length; i++){
      let max = 0;
      for(let j = 0; j < this.n; j++){
        max += this.values[j][i];
      }
      ans = (ans > max) ? ans : max;
    }
    return ans * 1.2;
  }
  makeBar(){
    this.clearBar();
    this.svg.insertAdjacentHTML("afterbegin",'<defs>' +
    '<filter id="inner">' +
    '<feOffset dx="-5" dy="-5" result="a" in="SourceGraphic"></feOffset>' +
    '<feGaussianBlur stdDeviation="3" result="b" in="a"></feGaussianBlur>' +
    '<feComposite operator="out" result="c" in="SourceGraphic" in2="b"></feComposite>' +
    '<feFlood flood-color="#fff" flood-opacity="0.6" result="d"></feFlood>' +
    '<feComposite operator="in" result="e" in="d" in2="c"></feComposite>' +
    '<feFlood flood-color="#aaa" flood-opacity="0.6" result="f"></feFlood>' +
    '<feOffset dx="5" dy="5" result="g" in="SourceGraphic"></feOffset>' +
    '<feGaussianBlur stdDeviation="3" result="h" in="g"></feGaussianBlur>' +
    '<feComposite operator="out" result="i" in="SourceGraphic" in2="h"></feComposite>' +
    '<feComposite operator="in" result="j" in="f" in2="i"></feComposite>' +
    '<feComposite result="k" in="j" in2="e"></feComposite>' +
    '<feComposite result="l" in="k" in2="SourceGraphic"></feComposite>' +
    '</filter>' +
    '</defs>');
    const w = this.width - (16*2);
    const h = this.height - (16*2 + 24*2);

    const bar_w = w / (this.x.length*2 + 1);
    this.max = this.calcMax();

    for(let i = 0; i < this.x.length; i++){
      let current_y = h;

      const rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
      rect.setAttributeNS(null,"x",bar_w*(i*2+1));
      rect.setAttributeNS(null,"width",bar_w);
      rect.setAttributeNS(null,"y",0);
      rect.setAttributeNS(null,"rx",10);
      rect.setAttributeNS(null,"ry",10);
      rect.setAttributeNS(null,"height",h);
      rect.setAttributeNS(null,"fill","#e0e0e0");
      rect.setAttributeNS(null,"filter","url(#inner)");
      this.svg.appendChild(rect);
      for(let j = 0; j < this.n; j++){
        current_y -= (this.values[j][i]/this.max)*h;
        const rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
        rect.setAttributeNS(null,"x",bar_w*(i*2+1));
        rect.setAttributeNS(null,"width",bar_w);
        rect.setAttributeNS(null,"y",current_y);
        rect.setAttributeNS(null,"rx",10);
        rect.setAttributeNS(null,"ry",10);
        rect.setAttributeNS(null,"height",(this.values[j][i]/this.max)*h);
        rect.setAttributeNS(null,"fill",this.colors[j]);
        this.svg.appendChild(rect);
      }
    }
  }
  changeBar() {
    const h = this.height - (16*2 + 24*2);
    this.max = this.calcMax();
    for(let i = 0; i < this.x.length; i++){
      let current_y = h;
      for(let j = 0; j < this.n; j++){
        current_y -= (this.values[j][i]/this.max)*h;
        const rect = this.svg.children[i*(this.n+1)+j+2];
        const value = this.values[j][i];
        this.changeBarAnimator(rect,value,current_y,100);
      }
    }
  }
  changeBarAnimator(rect,value,current_y,times,n=0){
    const h = this.height - (16*2 + 24*2);
    const scale = Ex.cubicBezier(n/times,0,0,1,0,0,1,1,1)[1];
    rect.setAttributeNS(null,"height",((value*scale)/this.max)*h);
    rect.setAttributeNS(null,"y",h - (h - current_y)*scale);
    if(n < times){
      setTimeout(this.changeBarAnimator.bind(this),1,rect,value,current_y,times,++n);
    }
  }
}

function main(){
  const pearent = document.body;
  let list = [];
  Ex.adjustScreenSize();
  list.push(new Pie(pearent,{"a":10,"b":20,"c":30,"d":40,"e":50}));
  list.push(new Line(pearent, [0,1,2,3,4,5,6,7,8,9,10,11,12], {"in":[0,10,20,40,30,40,20,50,60,70,100,120],"out":[120,110,80,30,50,60,10,30,10,80,110,0]},"title"));
  list.push(new Bar(pearent, [0,1,2,3,4,5],{0:[10,13,15,9,12,20],1:[5,3,8,12,5,1]},"title"));
  list.push(new Bar(pearent, [0,1,2],{0:[5,5,0]}));
  window.addEventListener("click", e => {
    list[0].changePie();
    list[1].changeLine();
    list[2].changeBar();
  });
}

main();