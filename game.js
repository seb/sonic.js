var width = 640, 
    height = 320,
    gLoop;

canvas = document.getElementById('canvas');

ctx = canvas.getContext('2d');

canvas.width   = width;
canvas.height  = height;

var clear = function() {
  ctx.fillStyle = '#d0e7f9';
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.closePath();
  ctx.fill();
}

var howManyCircles = 50, circles = [];
for (var i = 0; i <= howManyCircles; i++) {
  // width, height, radius, opacity
  circles.push([Math.random() * width, Math.random() * height, Math.random() * 50, Math.random() / 2]);
};

var DrawCircles = function() {
  for (var i = 0; i < howManyCircles; i++) {
    ctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')'; 
    ctx.beginPath();
    ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
};

var MoveCircles = function(deltaX){
  for (var i = 0; i < howManyCircles; i++) {
    if (circles[i][0] - circles[i][2] > width) {
      circles[i][0] = Math.random() * width;
      circles[i][2] = Math.random() * 50;
      circles[i][1] = 0 - circles[i][2];
      circles[i][3] = Math.random() / 2;
    } else {
      circles[i][0] -= deltaX;
    }
  }
};

var player = new (function(){
  var that = this;

  that.image = new Image();
  that.image.src = "sprites/sonic.png";
  that.width  = 33;
  that.height = 41;
  that.X = 0;
  that.Y = 0;

  // Gestion des frames
  that.frames = 1;
  that.actualFrame = 0;
  that.interval = 0;
  // Positionnement
  that.setPosition = function(x, y){
    that.X = x;
    that.Y = y;

  }
  that.frames = 1;
  that.actualFrame = 0;
  that.interval = 0;
  that.draw = function(){
    try {
      ctx.drawImage(that.image, 0, that.height * that.actualFrame, that.width, that.height, that.X, that.Y, that.width, that.height);
    } catch (e) {};

    if (that.interval == 3 ) {
        if (that.actualFrame == that.frames) {
            that.actualFrame = 0;
        } else {
            that.actualFrame++;
        }
        that.interval = 0;
    }
  that.interval++;

      }
})();


player.setPosition(~~((width-player.width)/2),  height-player.height);


var GameLoop = function(){
  clear();
  MoveCircles(0.2);
  DrawCircles();
  player.draw();
  gLoop = setTimeout(GameLoop, 1000 / 50);
}


GameLoop()

