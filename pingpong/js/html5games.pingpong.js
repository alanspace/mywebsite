var KEY = {
  UP: 38,
  DOWN: 40,
  W: 87,
  S: 83
};

var DIRECTION = {
  RIGHT: 1,
  LEFT: -1,
  UP: -1,
  DOWN: 1
};

var PLAYGROUND = {
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left"
};

var PADDLE = {
  RIGHT: "paddleB",
  LEFT: "paddleA"
};

var BALL_ACCELERATION = {
  // These values match the values of the radio buttons
  // that determine the ball's acceleration
  ZERO: "Zero",
  POSITIVE: "Positive"
};

var pingpong = {
  gameBegun : false,
  
  scores : {},
  winningScore : 10,
  isWinner : function() {
    return this.scores[PADDLE.LEFT] >= this.winningScore || 
      this.scores[PADDLE.RIGHT] >= this.winningScore;
  },

  // Create message if winner
  switchMessage : function() {
    if (this.switchedMessage) return;
    document.getElementById("header").innerHTML = "The winner is: " +
      ((this.scores[PADDLE.LEFT] > this.scores[PADDLE.RIGHT]) ? 
      "Player A" : "Player B");
    this.switchedMessage = true;
  },
  switchedMessage : false,
  
  PADDLE_SPEED : 5,
  playgroundMiddleX : 0
};

pingpong.scores[PADDLE.RIGHT] = 0;
pingpong.scores[PADDLE.LEFT] = 0;

pingpong.pressedKeys = [];
pingpong.ball = {
  speed: 5,
  resetSpeed: 5, // speed of a reset ball
  acceleration : BALL_ACCELERATION.ZERO,
  x: 150,
  y: 100,
  directionX: DIRECTION.RIGHT,
  directionY: DIRECTION.DOWN,
  width: 0,
  height: 0
};


$(function() {
  // set interval to call gameloop every 30 milliseconds
  pingpong.timer = setInterval(gameloop, 30);

  // mark down what key is down and up into an array called "pressedKeys"
  $(document).keydown(function(e) {
    pingpong.pressedKeys[e.which] = true;
  });
  $(document).keyup(function(e) {
    pingpong.pressedKeys[e.which] = false;
  });
});

function startGame() {
  document.getElementById("header").innerHTML = 
    "<span style='color:red'>Game begins in: 3</span>";
  prepareGame();
  setTimeout(function(){document.getElementById("header").innerHTML =
    "<span style='color:green'>Game begins in: 2</span>";}, 1000);
  setTimeout(function(){document.getElementById("header").innerHTML =
    "<span style='color:blue'>Game begins in: 1</span>";}, 2000);
  setTimeout(function(){pingpong.gameBegun = true; 
    document.getElementById("header").innerHTML =
    "<span style='color:red'>Play!</span>";}, 3000);
}

function prepareGame() {
  // Set the winning score
  var winningScore =
    Number(document.forms["settings"]["winningScore"].value);
  if (!(isNaN(winningScore) || winningScore <= 0))
    pingpong.winningScore = winningScore;
  
  // Set the ball's starting speed
  var resetSpeed =
    Number(document.forms["settings"]["ballStartSpeed"].value);
  if (!(isNaN(resetSpeed) || resetSpeed <= 0))
  {
    pingpong.ball.resetSpeed = pingpong.ball.speed = resetSpeed;
  }
  
  // Set the ball's acceleration
  pingpong.ball.acceleration = 
    document.forms["settings"]["ballAcceleration"].value;
  
  // This also deletes the form and the button, both of which were in
  // the changed element
  document.getElementById("game").innerHTML =
    '<div id="scoreboard">' +
      '<div class="score">Player A : <span id="scoreA">0</span></div>' +
      '<div class="score">Player B : <span id="scoreB">0</span></div>' +
    '</div>' +
    '<div id="game">' +
      '<div id="playground">' +
        '<div id="paddleA" class="paddle"></div>' +
        '<div id="paddleB" class="paddle"></div>' +
        '<div id="ball"></div>' +
      '</div>' +
    '</div>';
    
  pingpong.playgroundMiddleX = parseInt($("#playground").width()) / 2;
  pingpong.ball.width = parseInt($("#ball").width());
  pingpong.ball.height = parseInt($("#ball").height());
}

function gameloop() {
  if (pingpong.gameBegun) {
    if (!pingpong.isWinner()) {
      moveBall();
      movePaddles();
    }
    else {
      pingpong.switchMessage();
    }
  }
}

function moveBall() {
  var ball = pingpong.ball;
  
  ball.checkCollisionPlaygroundBoundaries(PLAYGROUND.TOP);
  ball.checkCollisionPlaygroundBoundaries(PLAYGROUND.RIGHT);
  ball.checkCollisionPlaygroundBoundaries(PLAYGROUND.BOTTOM);
  ball.checkCollisionPlaygroundBoundaries(PLAYGROUND.LEFT);
  ball.checkCollisionPaddle();

  // move the ball with speed and direction
  $("#ball").css({
    "left" : ball.x += ball.speed * ball.directionX,
    "top" : ball.y += ball.speed * ball.directionY
  });
}

function movePaddles() {
  // use our custom timer to continuously check if a key is pressed
  if (pingpong.pressedKeys[KEY.UP]) { // arrow-up
    // move the paddle B up
    var top = parseInt($("#paddleB").css("top"));
    $("#paddleB").css("top", top - pingpong.PADDLE_SPEED);
  }
  if (pingpong.pressedKeys[KEY.DOWN]) { // arrow-down
    // move the paddle B down
    var top = parseInt($("#paddleB").css("top"));
    $("#paddleB").css("top", top + pingpong.PADDLE_SPEED);
  }
  if (pingpong.pressedKeys[KEY.W]) { // w
    // move the paddle A up
    var top = parseInt($("#paddleA").css("top"));
    $("#paddleA").css("top", top - pingpong.PADDLE_SPEED);
  }
  if (pingpong.pressedKeys[KEY.S]) { // s
    // move the paddle A down
    var top = parseInt($("#paddleA").css("top"));
    $("#paddleA").css("top", top + pingpong.PADDLE_SPEED);
  }
}

function increaseScoreAndReset(paddle, ball) {
  increaseScore(paddle);
  ball.reset();
}

function increaseScore(paddle) {
  var paddleId = "#" + paddle;
  var scoreId = (paddle === PADDLE.LEFT) ? "#scoreA" : "#scoreB";
  
  pingpong.scores[paddle]++;
  $(scoreId).html(pingpong.scores[paddle]);
}

pingpong.ball.reset = function() {
  this.x = 200;
  this.y = 100;
  $("#ball").css({
    "left": this.x,
    "top" : this.y
  });
  this.speed = this.resetSpeed;
}

pingpong.ball.reverseX = function() {
  if (this.directionX === DIRECTION.RIGHT)
    this.directionX = DIRECTION.LEFT;
  else
    this.directionX = DIRECTION.RIGHT;
}

pingpong.ball.reverseY = function() {
  if (this.directionY === DIRECTION.UP)
    this.directionY = DIRECTION.DOWN;
  else
    this.directionY = DIRECTION.UP;
}

pingpong.ball.accelerate = function() {
  if (this.acceleration == BALL_ACCELERATION.ZERO)
    return;
  else if (this.acceleration == BALL_ACCELERATION.POSITIVE)
    this.speed++;
}

pingpong.ball.checkCollisionPlaygroundBoundaries = 
  function(playgroundBoundary) {
  // reference useful variables
  var playgroundHeight = parseInt($("#playground").height());
  var playgroundWidth = parseInt($("#playground").width());
  
  // check either goal (i.e. either the right or left bound)
  if ((playgroundBoundary === PLAYGROUND.LEFT && 
    this.x + this.speed * this.directionX < 0) ||
    (playgroundBoundary === PLAYGROUND.RIGHT &&
    this.x + this.speed * this.directionX + this.width > playgroundWidth))
  {
    increaseScoreAndReset((playgroundBoundary === PLAYGROUND.LEFT) ?
      PADDLE.RIGHT : PADDLE.LEFT, this);
    this.reverseX();
  }
  
  // check either the upper or lower bound
  else if ((playgroundBoundary === PLAYGROUND.TOP &&
    this.y + this.speed * this.directionY < 0) ||
    (playgroundBoundary === PLAYGROUND.BOTTOM &&
    this.y + this.speed * this.directionY + this.height > playgroundHeight))
  {
    this.reverseY();
  }
}

pingpong.ball.checkCollisionPaddle = function() {
  
  // if the ball is going left, only check the left paddle,
  // and vice-versa
  var paddle = ((this.directionX === DIRECTION.LEFT) ?
    PADDLE.LEFT : PADDLE.RIGHT);
  var paddleId = "#" + paddle;
  var paddleXLeft = parseInt($(paddleId).css("left"));
  var paddleXRight = paddleXLeft + parseInt($(paddleId).css("width"));
  var paddleYTop = parseInt($(paddleId).css("top"));
  var paddleYBottom = paddleYTop + parseInt($(paddleId).css("height"));
  
  var currentBallXLeft = this.x;
  var currentBallXRight = this.x + this.width;
  var currentBallYTop = this.y;
  var currentBallYBottom = this.y + this.height;
  var deltaX = this.speed * this.directionX;
  var deltaY = this.speed * this.directionY;
  
  // decide whether to use the ball's leftmost or rightmost point
  // for comparisons with the paddle's left and right
  var futureBallX = deltaX + ((this.directionX === DIRECTION.LEFT) ?
    currentBallXLeft : currentBallXRight);
    
  // decide whether to use the ball's highest or lowest point
  // for comparisons with the paddle's top and bottom
  var futureBallY = deltaY + ((this.directionY === DIRECTION.UP) ?
    currentBallYTop : currentBallYBottom);
  
  // compare the ball to either the left paddle's right or the
  // right paddle's left
  if (futureBallX <= paddleXRight &&
    futureBallX >= paddleXLeft &&
    currentBallYTop <= paddleYBottom &&
    currentBallYBottom >= paddleYTop)
  {
    this.reverseX();
    this.accelerate();
  }
  
  // compare the ball to the paddle's top and bottom
  if (futureBallY <= paddleYBottom &&
    futureBallY >= paddleYTop &&
    currentBallXLeft <= paddleXRight &&
    currentBallXRight >= paddleXLeft)
  {
    this.reverseY();
    this.accelerate();
  }
}