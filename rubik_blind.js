var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var X = 10;
var Y = 10;
var SIDE = 50;
var BORDER = 5;

var FACE_F = 1;
var FACE_U = 2;
var FACE_R = 3;
var FACE_L = 4;
var FACE_B = 5;
var FACE_D = 6;


var TRANSFORMS = {};
var TRANSFORM_U_FACE = [
  [SIDE, 0],
  [0, SIDE],
  [X + 2 * SIDE + 1 * BORDER, Y]
];
var TRANSFORM_D_FACE = [
  [SIDE, 0],
  [0, SIDE],
  [X + 2 * SIDE + 1 * BORDER, Y + 4 * SIDE + 2 * BORDER]
];
var TRANSFORM_F_FACE = [
  [SIDE, 0],
  [0, SIDE],
  [X + 2 * SIDE + 1 * BORDER, Y + 2 * SIDE + 1 * BORDER]
];
var TRANSFORM_B_FACE = [
  [SIDE, 0],
  [0, SIDE],
  [X + 6 * SIDE + 3 * BORDER, Y + 2 * SIDE + 1 * BORDER]
];
var TRANSFORM_L_FACE = [
  [SIDE, 0],
  [0, SIDE],
  [X, Y + 2 * SIDE + 1 * BORDER]
];
var TRANSFORM_R_FACE = [
  [SIDE, 0],
  [0, SIDE],
  [X + 4 * SIDE + 2 * BORDER, Y + 2 * SIDE + 1 * BORDER]
];
var TRANSFORMS = {};
TRANSFORMS[FACE_U] = TRANSFORM_U_FACE;
TRANSFORMS[FACE_D] = TRANSFORM_D_FACE;
TRANSFORMS[FACE_F] = TRANSFORM_F_FACE;
TRANSFORMS[FACE_B] = TRANSFORM_B_FACE;
TRANSFORMS[FACE_R] = TRANSFORM_R_FACE;
TRANSFORMS[FACE_L] = TRANSFORM_L_FACE;

var RED = 0;
var ORANGE = 1;
var BLUE = 2;
var GREEN = 3;
var WHITE = 4;
var YELLOW = 5;
var GREY = 6;

var COLORS = ["red", "orange", "blue", "green", "white", "yellow", "grey"];

function mul(vector, matrix) {
  vector.push(1);
  columns = matrix[0].length;
  result = new Array(columns);
  for (var i = 0; i < columns; i++) {
    result[i] = 0;
    for (var j = 0; j < vector.length; j++) {
      result[i] += vector[j] * matrix[j][i];
    }
  }
  return result;
}

function drawCubicle(x, y, color, face) {
  transform = TRANSFORMS[face];
  ctx.beginPath();
  ctx.lineWidth = "1";
  ctx.strokStyle = "black";
  path = [[x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1]];
  transformedPath = path.map(function (v) { return mul(v, transform); });
  ctx.moveTo(transformedPath[0][0], transformedPath[0][1]);
  for (var i = 1; i < transformedPath.length; i++) {
    ctx.lineTo(transformedPath[i][0], transformedPath[i][1]);
  }
  ctx.closePath();
  ctx.stroke();
  if (color) {
    ctx.fillStyle = color;
    ctx.fill();
  }
}

/**
 * get a random int in [0,max) interval
 * @param {int} max
 */
function getRandomInt(max) {
  min = 0;
  return Math.floor(Math.random() * (max - min)) + min;
}

function drawGreyCube() {
  for (var x = 0; x < 2; x++) {
    for (var y = 0; y < 2; y++) {
      drawCubicle(x, y, COLORS[YELLOW], FACE_U);
      drawCubicle(x, y, COLORS[WHITE], FACE_D);
      drawCubicle(x, y, COLORS[RED], FACE_F);
      drawCubicle(x, y, COLORS[ORANGE], FACE_B);
      drawCubicle(x, y, COLORS[GREEN], FACE_R);
      drawCubicle(x, y, COLORS[BLUE], FACE_L);
    }
  }
}

function generateQuiz() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGreyCube();
}

generateQuiz();
