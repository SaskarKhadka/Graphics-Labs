const X_MAX = 700;
const X_MIN = 100;
const Y_MAX = 500;
const Y_MIN = 100;

let line_end_1_x;
let line_end_1_y;
let line_end_2_x;
let line_end_2_y;

let randomLineDrawn = false;
let randomPolygonDrawn = false;

function drawRandomLine() {
  randomLineDrawn = true;
  randomPolygonDrawn = false;
  line_end_1_x = Math.floor(Math.random() * (X_MAX - X_MIN + 1) + X_MIN);
  line_end_1_y = Math.floor(Math.random() * (Y_MAX - Y_MIN + 1) + Y_MIN);
  line_end_2_x = Math.floor(Math.random() * (X_MAX - X_MIN + 1) + X_MIN);
  line_end_2_y = Math.floor(Math.random() * (Y_MAX - Y_MIN + 1) + Y_MIN);

  createViewport();
  createLine(
    [
      normalise(line_end_1_x, canvasWidth),
      normalise(line_end_1_y, canvasHeight),
      0,
      normalise(line_end_2_x, canvasWidth),
      normalise(line_end_2_y, canvasHeight),
      0,
    ],
    (fragCode = redFragCode)
  );
}

const randomLineButton = document.getElementById("random-line");
randomLineButton.addEventListener("click", drawRandomLine);
