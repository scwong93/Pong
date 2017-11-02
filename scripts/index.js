var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


canvas.height = 700;
canvas.width = 1400;
context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);


context.fillStyle = 'white'
context.fillRect(700, 0, 10, 700)


var Paddle = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 10;
  this.height = 100;
};

Paddle.prototype.render = function() {
  context.fillRect(this.x, this.y, 10, 100);
  context.fillStyle = 'white';
  context.fill();
};

var player = new Paddle(1385, 300);

var computer = new Paddle(5,300);


var Ball = function(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 30;
  this.startingAngle = 0 * Math.PI;
  this.endingAngle = 2 * Math.PI;
  this.counterClockwise = false;
};

Ball.prototype.render = function() {

  context.beginPath();
  context.arc(this.x, this.y, this.radius, this.startingAngle, this.endingAngle, this.counterClockwise);
  context.lineWidth = 15;
  context.fillStyle = 'white';
  context.fill();
  context.strokeStyle = 'white';
  context.stroke();
};

var ball = new Ball(700,350);
var render = function() {
  player.render();
  computer.render();
  ball.render();
};

window.onload = function() {
  render();
};
