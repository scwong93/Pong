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

computer.update = function() {
  if (ball.y + 20 > this.y) {
    this.move(5);
  } else if (ball.y - 20 < this.y) {
    this.move(-5);
  }
};

// Ball constructor and methods
var Ball = function(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 10;
  this.startingAngle = 0 * Math.PI;
  this.endingAngle = 2 * Math.PI;
  this.counterClockwise = false;
  this.angleX = Math.floor((Math.random() * 5) + 3);
  this.angleY = Math.floor((Math.random() * 5) + 3);
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

var playerScore = 0;
var computerScore = 0;

document.getElementById('computer-score').innerHTML = 0;
document.getElementById('player-score').innerHTML = 0;

Ball.prototype.update = function() {
  this.x += this.angleX;
  this.y += this.angleY;

  var ballTop = this.y - 10;
  var ballBottom = this.y + 10;
  var ballLeft = this.x - 10;
  var ballRight = this.x + 10;

  if (ballTop < 0 || ballBottom > canvas.height) {
    this.angleY *= -1;
  }

  if (ballRight >= 1385 && ballBottom >= player.y && ballTop <= (player.y + 100)) {
    this.angleX *= -1;
  }

  if (ballLeft <= 15 && ballBottom >= computer.y && ballTop <= (computer.y + 100)) {
    this.angleX *= -1;
  }

  if (ballRight > 1400) {
    computerScore++;
    document.getElementById('computer-score').innerHTML = computerScore;
    if (computerScore == 11) {
      gameOver('computer');
    }
    ball.x = 1350;
    ball.y = 350;
    this.angleX = -(Math.floor((Math.random() * 10) + 3));
    this.angleY = -(Math.floor((Math.random() * 10) + 3));
  }

  if (ballLeft < 0) {
    playerScore++;
    document.getElementById('player-score').innerHTML = playerScore;
    if (playerScore == 11) {
      gameOver('player');
    }
    ball.x = 100;
    ball.y = 350;
    this.angleX = Math.floor((Math.random() * 10) + 3);
    this.angleY = Math.floor((Math.random() * 10) + 3);
  }
};

var gameOver = function(string) {
  if (string == 'computer') {
    document.getElementById('win-lose').innerHTML = "You Lost! Refresh to try again.";
  } else if (string == 'player') {
    document.getElementById('win-lose').innerHTML = "You Won! Refresh to play again.";
  }
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

var update = function() {
  ball.update();
  computer.update();
};

var step = function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  render();
  update();
  animate(step);
};

window.addEventListener('keydown', function(event) {
  if (event.keyCode == 40) {
    player.move(30);
  } else if (event.keyCode == 38) {
    player.move(-30);
  }
});

window.onload = function() {
  step();
};
