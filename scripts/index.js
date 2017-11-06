var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// canvas background
var createCanvas = function() {
  canvas.height = 700;
  canvas.width = 1400;
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // center white line
  context.fillStyle = 'white'
  context.fillRect(700, 0, 10, 700)
};

// Paddle constructor and methods
var Paddle = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 10;
  this.height = 100;
  this.speed = 10;
};

Paddle.prototype.render = function() {
  context.fillRect(this.x, this.y, 10, 100);
  context.fillStyle = 'white';
  context.fill();
};

Paddle.prototype.move = function(y_pos) {
  if (this.y + y_pos < 0 ) {
    this.y = 0;
  } else if (this.y + y_pos > 600) {
    this.y = 600;
  } else {
    this.y += y_pos;
  }
};

// Player and computer methods
var player = new Paddle(1385, 300);

var computer = new Paddle(5,300);

// Ball constructor and methods
var Ball = function(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 10;
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

var animate = window.requestAnimationFrame ||
              function(callback) { window.setTimeout(callback, 1000/60) }

var render = function() {
  createCanvas();
  player.render();
  computer.render();
  ball.render();
};

var step = function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  render();
  animate(step);
};

window.addEventListener('keydown', function(event) {
  if (event.keyCode == 40) {
    player.move(10);
  } else if (event.keyCode == 38) {
    player.move(-10);
  }
});

window.addEventListener('keyup', function(event) {
  // do I need this logic?
});



window.onload = function() {
  step();
};
