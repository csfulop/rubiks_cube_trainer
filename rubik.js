var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var X = 40;
var Y = 110;
var SIDE = 50;
var TRANSFORM_F_FACE = [
  [SIDE, 0],
  [0, SIDE],
  [X, Y]
];
var TRANSFORM_U_FACE = [
  [SIDE, 0],
  [SIDE / 2, -SIDE / 2],
  [X, Y]
];
var TRANSFORM_R_FACE = [
  [SIDE / 2, -SIDE / 2],
  [0, SIDE],
  [X + 3 * SIDE, Y]
];
var FACE_R = 1;
var FACE_U = 2;
var FACE_F = 3;
var TRANSFORMS = {};
TRANSFORMS[FACE_R] = TRANSFORM_R_FACE;
TRANSFORMS[FACE_U] = TRANSFORM_U_FACE;
TRANSFORMS[FACE_F] = TRANSFORM_F_FACE;

var RED = 0;
var ORANGE = 1;
var BLUE = 2;
var GREEN = 3;
var WHITE = 4;
var YELLOW = 5;
var GREY = 6;

var CORNERS = [
  [WHITE, GREEN, ORANGE],
  [WHITE, ORANGE, BLUE],
  [WHITE, BLUE, RED],
  [WHITE, RED, GREEN],
  [YELLOW, GREEN, RED],
  [YELLOW, RED, BLUE],
  [YELLOW, BLUE, ORANGE],
  [YELLOW, ORANGE, GREEN]
];

var COLORS = ["red", "orange", "blue", "green", "white", "yellow", "grey"];
var COLOR_CSS = ["red", "orange", "blue", "green", "white", "yellow"];

var stats = { "total": 0, "correct": 0 };

var BUTTONS = COLOR_CSS.map(function (x) { return document.getElementById(x + "-button"); });
var NEXT_QUIZ_DELAY_MS = 1000;
var timer;

function setCookie(cname, cvalue, exdays = 60) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function updateStats() {
  document.getElementById("correct").textContent = stats.correct;
  document.getElementById("total").textContent = stats.total;
}

function loadStats() {
  var COOKIE = getCookie("rubik");
  if (COOKIE) {
    stats = JSON.parse(COOKIE);
  }
  updateStats();
}

function saveStats() {
  setCookie("rubik", JSON.stringify(stats));
}

function showSolution(element) {
  stats.total++;
  var solution = document.getElementById(SOLUTION_ID);
  if (element == solution) {
    stats.correct++;
  }
  saveStats();
  updateStats();
  BUTTONS.forEach(function (x) { x.disabled = true; });
  nextQuizTimer(element, solution);
}

function resetButtons() {
  BUTTONS.forEach(function (x) {
    x.className = "";
    x.disabled = false;
  });
}

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

function getRandomInt(max) {
  min = 0;
  return Math.floor(Math.random() * (max - min)) + min;
}

function drawGreyCube(params) {
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      drawCubicle(x, y, COLORS[GREY], FACE_U);
      drawCubicle(x, y, COLORS[GREY], FACE_F);
      drawCubicle(x, y, COLORS[GREY], FACE_R);
    }
  }
}

function generateQuiz() {
  corner = CORNERS[getRandomInt(CORNERS.length)];
  rotation = getRandomInt(corner.length);
  drawCubicle(2, 0, COLORS[corner[rotation]], FACE_R);
  drawCubicle(2, 2, COLORS[corner[(rotation + 1) % corner.length]], FACE_U);
  backColor = corner[(rotation + 2) % corner.length];
  SOLUTION_ID = COLOR_CSS[backColor] + "-button";
}

function nextQuizTimer(selected, solution, blinkNumber = 5, blinkDelayMs = 200) {
  var timer;
  function showSolution() {
    solution.className = "correct";
    if (selected != solution) {
      selected.className = "wrong";
    }
  }
  function dontShowSolution() {
    BUTTONS.forEach(function (x) { x.className = ""; });
  }
  function f() {
    if (blinkNumber == 0) {
      clearInterval(timer);
      nextQuiz();
    }
    else {
      if (blinkNumber % 2) {
        dontShowSolution();
      }
      else {
        showSolution();
      }
      blinkNumber--;
    }
  }
  showSolution();
  timer = setInterval(f, blinkDelayMs);
}

function nextQuiz() {
  resetButtons();
  generateQuiz();
}

loadStats();
drawGreyCube();
generateQuiz();
