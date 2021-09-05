let WHITE = 0;
let YELLOW = 1;
let GREEN = 2;
let BLUE = 3;
let RED = 4;
let ORANGE = 5;
let IGNORED = 6;

let COLORS = ['W', 'Y', 'G', 'B', 'R', 'O', '.'];
let CSS_COLOR_CLASSES = ['white', 'yellow', 'green', 'blue', 'red', 'orange', 'ignored'];

let MOVES = new Map([
  ["R", R],
  ["RP", RP],
  ["R2", R2],
  ["R2P", R2],
  ["r", r],
  ["rP", rP],
  ["r2", r2],
  ["r2P", r2],
  ["L", L],
  ["LP", LP],
  ["L2", L2],
  ["L2P", L2],
  ["l", l],
  ["lP", lP],
  ["l2", l2],
  ["l2P", l2],
  ["U", U],
  ["UP", UP],
  ["U2", U2],
  ["U2P", U2],
  ["u", u],
  ["uP", uP],
  ["u2", u2],
  ["u2P", u2],
  ["D", D],
  ["DP", DP],
  ["D2", D2],
  ["D2P", D2],
  ["d", d],
  ["dP", dP],
  ["d2", d2],
  ["d2P", d2],
  ["F", F],
  ["FP", FP],
  ["F2", F2],
  ["F2P", F2],
  ["f", f],
  ["fP", fP],
  ["f2", f2],
  ["f2P", f2],
  ["B", B],
  ["BP", BP],
  ["B2", B2],
  ["B2P", B2],
  ["b", b],
  ["bP", bP],
  ["b2", b2],
  ["b2P", b2],
  ["M", M],
  ["MP", MP],
  ["M2", M2],
  ["M2P", M2],
  ["S", S],
  ["SP", SP],
  ["S2", S2],
  ["S2P", S2],
  ["X", X],
  ["XP", XP],
  ["X2", X2],
  ["X2P", X2],
  ["Y", Y],
  ["YP", YP],
  ["Y2", Y2],
  ["Y2P", Y2],
  ["Z", Z],
  ["ZP", ZP],
  ["Z2", Z2],
  ["Z2P", Z2],
])

let ALGS = new Map();
let PATTERNS = new Map();

let cube = [
  [
    [WHITE, WHITE, WHITE],
    [WHITE, WHITE, WHITE],
    [WHITE, WHITE, WHITE]
  ],
  [
    [YELLOW, YELLOW, YELLOW],
    [YELLOW, YELLOW, YELLOW],
    [YELLOW, YELLOW, YELLOW]
  ],
  [
    [GREEN, GREEN, GREEN],
    [GREEN, GREEN, GREEN],
    [GREEN, GREEN, GREEN]
  ],
  [
    [BLUE, BLUE, BLUE],
    [BLUE, BLUE, BLUE],
    [BLUE, BLUE, BLUE]
  ],
  [
    [RED, RED, RED],
    [RED, RED, RED],
    [RED, RED, RED]
  ],
  [
    [ORANGE, ORANGE, ORANGE],
    [ORANGE, ORANGE, ORANGE],
    [ORANGE, ORANGE, ORANGE]
  ]
];

cube = X2(cube);
cube = ignoreColorExcept(cube, YELLOW);
let ORIG_CUBE = _.cloneDeep(cube);

function rotateFace(face) {
  let result = _.cloneDeep(face);
  result[0][0] = face[2][0];
  result[1][0] = face[2][1];
  result[2][0] = face[2][2];
  result[2][1] = face[1][2];
  result[2][2] = face[0][2];
  result[1][2] = face[0][1];
  result[0][2] = face[0][0];
  result[0][1] = face[1][0];
  return result;
}

function prime(cube, alg) {
  return alg(alg(alg(cube)));
}

function double(cube, alg) {
  return alg(alg(cube));
}

function I(cube) {
  return cube;
}

function X(cube) {
  let result = _.cloneDeep(cube)
  result[0] = cube[2];
  result[1] = rotateFace(rotateFace(cube[3]));
  result[2] = cube[1];
  result[3] = rotateFace(rotateFace(cube[0]));
  result[4] = rotateFace(cube[4]);
  result[5] = rotateFace(rotateFace(rotateFace(cube[5])));
  return result;
}

function XP(cube) {
  return prime(cube, X);
}

function X2(cube) {
  return double(cube, X);
}

function Y(cube) {
  let result = _.cloneDeep(cube)
  result[2] = cube[4];
  result[4] = cube[3];
  result[3] = cube[5];
  result[5] = cube[2];
  result[0] = rotateFace(cube[0]);
  result[1] = rotateFace(rotateFace(rotateFace(cube[1])));
  return result;
}

function YP(cube) {
  return prime(cube, Y);
}

function Y2(cube) {
  return double(cube, Y);
}

function Z(cube) {
  return XP(Y(X(cube)));
}

function ZP(cube) {
  return prime(cube, Z);
}

function Z2(cube) {
  return double(cube, Z);
}

function R(cube) {
  let result = _.cloneDeep(cube)
  result[0][0][2] = cube[2][0][2];
  result[0][1][2] = cube[2][1][2];
  result[0][2][2] = cube[2][2][2];

  result[1][0][2] = cube[3][2][0];
  result[1][1][2] = cube[3][1][0];
  result[1][2][2] = cube[3][0][0];

  result[2][0][2] = cube[1][0][2];
  result[2][1][2] = cube[1][1][2];
  result[2][2][2] = cube[1][2][2];

  result[3][0][0] = cube[0][2][2];
  result[3][1][0] = cube[0][1][2];
  result[3][2][0] = cube[0][0][2];

  result[4] = rotateFace(cube[4]);

  return result;
}

function RP(cube) {
  return prime(cube, R);
}

function R2(cube) {
  return double(cube, R);
}

function r(cube) {
  return alg(cube, [L, X]);
}

function rP(cube) {
  return prime(cube, r);
}

function r2(cube) {
  return double(cube, r);
}

function L(cube) {
  return alg(cube, [Y2, R, Y2]);
}

function LP(cube) {
  return prime(cube, L);
}

function L2(cube) {
  return double(cube, L);
}

function l(cube) {
  return alg(cube, [R, XP]);
}

function lP(cube) {
  return prime(cube, l);
}

function l2(cube) {
  return double(cube, l);
}

function U(cube) {
  return alg(cube, [Z, R, ZP]);
}

function UP(cube) {
  return prime(cube, U);
}

function U2(cube) {
  return double(cube, U);
}

function u(cube) {
  return alg(cube, [D, Y]);
}

function uP(cube) {
  return prime(cube, u);
}

function u2(cube) {
  return double(cube, u);
}

function D(cube) {
  return alg(cube, [ZP, R, Z]);
}

function DP(cube) {
  return prime(cube, D);
}

function D2(cube) {
  return double(cube, D);
}

function d(cube) {
  return alg(cube, [U, YP]);
}

function dP(cube) {
  return prime(cube, d);
}

function d2(cube) {
  return double(cube, d);
}

function F(cube) {
  return alg(cube, [YP, R, Y]);
}

function FP(cube) {
  return prime(cube, F);
}

function F2(cube) {
  return double(cube, F);
}

function f(cube) {
  return alg(cube, [B, Z]);
}

function fP(cube) {
  return prime(cube, f);
}

function f2(cube) {
  return double(cube, f);
}

function B(cube) {
  return alg(cube, [Y, R, YP]);
}

function BP(cube) {
  return prime(cube, B);
}

function B2(cube) {
  return double(cube, B);
}

function b(cube) {
  return alg(cube, [F, ZP]);
}

function bP(cube) {
  return prime(cube, b);
}

function b2(cube) {
  return double(cube, b);
}

function M(cube) {
  return alg(cube, [R, rP]);
}

function MP(cube) {
  return prime(cube, M);
}

function M2(cube) {
  return double(cube, M);
}

function S(cube) {
  return alg(cube, [Y, R, rP, YP]);
}

function SP(cube) {
  return prime(cube, S);
}

function S2(cube) {
  return double(cube, S);
}

function alg(cube, moves) {
  if (!(moves instanceof Array)) {
    moves = parseAlg(moves);
  }
  moves.forEach(move => {
    if (typeof move !== 'function') {
      if (!(MOVES.has(move))) {
        throw `Missing MOVE: ${move}`;
      }
      move = MOVES.get(move);
    }
    cube = move(cube);
  });
  return cube;
}

function reverseAlg(cube, moves) {
  if (!(moves instanceof Array)) {
    moves = parseAlg(moves);
  }
  moves.reverse();
  moves.forEach(move => {
    if (typeof move !== 'function') {
      if (!(MOVES.has(move))) {
        throw `Missing MOVE: ${move}`;
      }
      move = MOVES.get(move);
    }
    cube = prime(cube, move);
  });
  return cube;
}

function parseAlg(alg) {
  let result = [];
  alg = alg.replace(/[ \(\)]/g, '');
  let i = 0;
  while (i < alg.length) {
    let step = alg[i++];
    while ("'2".includes(alg[i])) {
      let modifier = alg[i++];
      step += modifier === "'" ? "P" : modifier;
    }
    result.push(step);
  }
  return result;
}

function printFace(face) {
  console.log(face.map(row => '[' + row.map(v => COLORS[v]).join() + ']').join('\n'));
}

function printCube(cube) {
  [0, 2, 4, 3, 5, 1].forEach(i => printFace(cube[i]));
}

function setCss(cube) {
  $('#cube div').removeClass(CSS_COLOR_CLASSES);
  cube[0].forEach((row, j) => {
    row.forEach((cell, i) => {
      $(`#cell${j + 1}${i + 1}`).addClass(CSS_COLOR_CLASSES[cell]);
    });
  });
  [0, 1, 2].forEach(i => {
    $(`#cell1${i + 1}n`).addClass(CSS_COLOR_CLASSES[cube[3][0][2 - i]]);
    $(`#cell3${i + 1}s`).addClass(CSS_COLOR_CLASSES[cube[2][0][i]]);
    $(`#cell${i + 1}1w`).addClass(CSS_COLOR_CLASSES[cube[5][0][i]]);
    $(`#cell${i + 1}3e`).addClass(CSS_COLOR_CLASSES[cube[4][0][2 - i]]);
  });
  updatePattern();
}

function updatePattern() {
  let pattern = getPattern(cube);
  let name = 'unknown';
  if (PATTERNS.has(pattern)) {
    name = PATTERNS.get(pattern);
  }
  $('#pattern').text(name);
}

function ignoreColorExcept(cube, color) {
  let result = _.cloneDeep(cube);
  result.forEach(face => {
    face.forEach(row => {
      row.forEach((cell, i, a) => {
        if (cell !== color) {
          a[i] = IGNORED;
        }
      })
    })
  });
  return result;
}

function fillMoves() {
  MOVES.forEach((value, key) => {
    let div = $('<button/>', {
      class: 'moveButton',
      text: key,
      click: function () {
        cube = value(cube);
        setCss(cube);
      }
    });
    $('#moves').append(div);
  });
}

function updateAlgs() {
  processAlgs($('#yourAlgs').val());
  fillAlgs();
  fillPatterns();
}

function processAlgs(algs) {
  ALGS.clear();
  algs.split('\n').forEach(def => {
    if (def.includes(':')) {
      def = def.split(':');
      ALGS.set(def[0], def[1]);
    }
  });
}

function fillAlgs() {
  $('#algs').empty();
  $('#howToSetUp').empty();
  ALGS.forEach((value, key) => {
    let div = $('<button/>', {
      class: 'algButton',
      text: key,
      click: function () { doAlg(key, value); }
    });
    $('#algs').append(div);
    let how = $('<button/>', {
      class: 'howButton',
      text: key,
      click: function () { findAlg(key); }
    });
    $('#howToSetUp').append(how);
  });
}

function doAlg(name, algo) {
  try {
    cube = alg(cube, algo);
    setCss(cube);
  } catch (e) {
    alert(e);
  }
}

function findAlg(name) {
  console.log(`findAlg(${name})`);

  $('#searchInProgress').show();
  $('#howToSetUpResult').empty();
  $('#howToSetUpTarget').text(name);

  STEPS = 0

  function find(cube, result) {
    STEPS++;
    if (STEPS % 1000 == 0) {
      console.log(STEPS);
    }
    if (result.length >= 3) {
      return;
    }
    ALGS.forEach((value, key) => {
      let c2 = alg(cube, value);
      let result2 = [...result, key];
      let pattern = getPattern(c2);
      if (PATTERNS.get(pattern) === name) {
        // FIXME: filter I out from result
        $('#howToSetUpResult').append(
          $('<div/>', {
            text: result2
          })
        );
        console.log(result2);
      } else {
        addU(c2, result2);
      }
    });
    // FIXME: iterative alg for searching:
    // FIXME: collect step lambdas into list, extend list with new states from the steps
    // FIXME: clean up when the list is empty
    // FIXME: check stop button state in steps and stop the iteration
  }

  function addU(cube,result) {
    [I,U,UP,U2].forEach(uTurn=>{
      find(uTurn(cube),[...result,uTurn.name]);
    });
  }

  cube = newCube();
  setTimeout(() => {
    find(cube, []);
    $('#searchInProgress').hide();
    console.log('Finished!');
  }, 100);
}

function fillPatterns() {
  PATTERNS.clear();
  ALGS.forEach((algo, name) => {
    let cube = newCube();
    cube = reverseAlg(cube, algo);
    [Y, Y, Y, Y].forEach(t => {
      cube = t(cube);
      PATTERNS.set(getPattern(cube), name);
    });
  });
}

function isColor(color) {
  return color === IGNORED ? 0 : 1;
}

function getPattern(cube) {
  let result = [];
  cube[0].forEach((row, j) => {
    row.forEach((cell, i) => {
      result.push(isColor(cell));
    });
  });
  [0, 1, 2].forEach(i => {
    result.push(isColor(cube[3][0][2 - i]));
    result.push(isColor(cube[2][0][i]));
    result.push(isColor(cube[5][0][i]));
    result.push(isColor(cube[4][0][2 - i]));
  });
  return _.sum(result.map((e, i) => e * 2 ** i));
}

function fillMiscButtons() {
  $('#miscButtons').append(
    $('<button/>', {
      text: 'Reset',
      click: function () {
        resetCube();
        setCss(cube);
      }
    })
  );
}

function newCube() {
  return _.cloneDeep(ORIG_CUBE);
}

function resetCube() {
  cube = newCube();
}

// cube = alg(cube, [LP, R2, B2, L2, BP, D2, FP, L2, R2, FP, R, UP]);
// cube = alg(cube, parseAlg("L' R2 B2 (L2 B' D2 F') L2 R2 F' R U'"));
// cube = alg(cube, "L' R2 B2 (L2 B' D2 F') L2 R2 F' R U'");
// cube = ignoreColorExcept(cube,WHITE);

// printCube(cube);

setCss(cube);

fillMiscButtons();
fillMoves();
updateAlgs();
