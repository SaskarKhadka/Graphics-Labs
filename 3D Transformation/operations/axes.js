function drawAxes() {
  createLine([
    normalise(0, canvasWidth),
    normalise(300, canvasHeight),
    0,
    normalise(800, canvasWidth),
    normalise(300, canvasHeight),
    0,
  ]);
  createLine([
    normalise(400, canvasWidth),
    normalise(0, canvasHeight),
    0,
    normalise(400, canvasWidth),
    normalise(600, canvasHeight),
    0,
  ]);
}

// drawAxes();
