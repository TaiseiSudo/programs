class Display {
  constructor() {
    this.canvas = document.getElementById("screen");
    this.ctx = canvas.getContext("2d");
    this.displayWeight = document.body.offsetWidth;
    this.displayHeight = document.body.offsetHeight;
  }

  getMousePos() {
    const x = this.canvas.offset
    return [0.0, 0.0];
  }

  clearCanvas() {

  }

  getCtx() {
    return null;
  }

  addClickEvent(func) {

  }

  update(objs) {

  }

  coillicion() {

  }

  draw() {

  }

  adjustScreenSize() {
    width = document.body.offsetWidth;
    height = document.body.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    // ctx.translate(Math.ceil(width/2),Math.ceil(height/2));
  }
}

class Field {
  constructor() {
    this.weight = 0;
    this.height = 0;
    this.objs = [];
    this.totalScore = 0;
    this.nextObj = null;
  }

  dropObj(x, y) {

  }

  addObj(obj) {

  }

  deleteObj(obj) {

  }

  getNextObj() {
    return null;
  }

  addRndNextObj() {

  }

  addScore(score) {

  }

  isGameOver() {
    return false;
  }
}

class RigidBody {
  constructor() {
    this.a = [0.0, 0.0];
    this.v = [0.0, 0.0];
    this.e = 0.0;
    this.isUseGravity = false;
  }

  update(dmsec) {

  }

  addForce(forceMode="Force") {

  }
}

class Object {
  constructor() {
    this.size = 0.0;
    this.weight = 0.0;
    this.score = 0;
    this.tag = null;
    this.pos = null;
    this.ctx = null;
  }

  setSize(size) {

  }

  getSize() {
    return 0.0;
  }

  setWeight(weight) {

  }

  getWeight() {
    return 0.0;
  }

  setScore(score) {

  }

  getScore() {
    return 0;
  }

  setTag(tag) {

  }

  getTag() {
    return null;
  }

  setPos(pos) {

  }

  getPos() {
    return null;
  }

  draw() {

  }

  marge(pos) {

  }
}

class Position {
  constructor() {
    this.x = 0.0;
    this.y = 0.0;
  }

  setPos(x, y) {

  }

  setX(x) {

  }

  setY(y) {

  }

  getPos() {
    return [0.0, 0.0];
  }

  getX() {
    return 0.0;
  }

  getY() {
    return 0.0;
  }
}