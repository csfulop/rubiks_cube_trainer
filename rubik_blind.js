var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var X = 10;
var Y = 10;
var SIDE = 50;
var BORDER = 5;

var FACE_U = 0;
var FACE_L = 1;
var FACE_F = 2;
var FACE_R = 3;
var FACE_B = 4;
var FACE_D = 5;

FACE_U_X = X + 2 * SIDE + 1 * BORDER;
FACE_U_Y = Y;
FACE_D_X = X + 2 * SIDE + 1 * BORDER;
FACE_D_Y = Y + 4 * SIDE + 2 * BORDER;
FACE_F_X = X + 2 * SIDE + 1 * BORDER;
FACE_F_Y = Y + 2 * SIDE + 1 * BORDER;
FACE_B_X = X + 6 * SIDE + 3 * BORDER;
FACE_B_Y = Y + 2 * SIDE + 1 * BORDER;
FACE_L_X = X;
FACE_L_Y = Y + 2 * SIDE + 1 * BORDER;
FACE_R_X = X + 4 * SIDE + 2 * BORDER;
FACE_R_Y = Y + 2 * SIDE + 1 * BORDER;

var TRANSFORMS = {};
var TRANSFORM_U_FACE = [
  [SIDE, 0],
  [0, SIDE],
  [FACE_U_X, FACE_U_Y]
];
var TRANSFORM_D_FACE = [
  [SIDE, 0],
  [0, SIDE],
  [FACE_D_X, FACE_D_Y]
];
var TRANSFORM_F_FACE = [
  [SIDE, 0],
  [0, SIDE],
  [FACE_F_X, FACE_F_Y]
];
var TRANSFORM_B_FACE = [
  [SIDE, 0],
  [0, SIDE],
  [FACE_B_X, FACE_B_Y]
];
var TRANSFORM_L_FACE = [
  [SIDE, 0],
  [0, SIDE],
  [FACE_L_X, FACE_L_Y]
];
var TRANSFORM_R_FACE = [
  [SIDE, 0],
  [0, SIDE],
  [FACE_R_X, FACE_R_Y]
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

var QUESTION;
var ANSWER = "abdcefhgijlkmnpoqrtsuvxw";

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

function drawFlattenedCube() {
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

function moveQuestionmark() {
  face = Math.floor(QUESTION / 4);
  y = Math.floor((QUESTION % 4) / 2);
  x = QUESTION % 2;
  console.log("face=%d, x=%d, y=%d", face, x, y);
  transform = TRANSFORMS[face];
  v = [x, y];
  v2 = mul(v, transform);
  document.getElementById("questionmark").style.fontSize = SIDE;
  document.getElementById("questionmark").style.left = v2[0] + SIDE / 4;
  document.getElementById("questionmark").style.top = v2[1];
  document.getElementById("questionmark").style.visibility = "visible";
}

function showAnswer() {
  answer = ANSWER.charAt(QUESTION).toUpperCase();
  document.getElementById("answer").value = answer;
}

function generateQuiz() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFlattenedCube();
  QUESTION = getRandomInt(6 * 4);
  moveQuestionmark();
  showAnswer();
}

generateQuiz();
