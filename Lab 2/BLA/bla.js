/**
 * Creates a line using the BLA Algorithm
 */

function createLineUsingBLA(startingVertex, endingVertex) {
  const slope =
    (parseInt(endingVertex[1]) - parseInt(startingVertex[1])) /
    (parseInt(endingVertex[0]) - parseInt(startingVertex[0]));

  const dx = parseInt(endingVertex[0]) - parseInt(startingVertex[0]);
  const dy = parseInt(endingVertex[1]) - parseInt(startingVertex[1]);

  let x = parseInt(startingVertex[0]);
  let y = parseInt(startingVertex[1]);

  let redFragCode =
    "void main(void)" + "{" + "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" + "}";

  createPoint(redFragCode, [
    normalise(x, canvasWidth),
    normalise(y, canvasHeight),
    0.0,
  ]);

  let p = 2 * dy - dx;

  count = 0;
  if (Math.abs(slope) < 1) {
    while (count < dx) {
      if (p < 0) {
        x = x + 1;
        p = p + 2 * dy;
        createPoint(redFragCode, [
          normalise(x, canvasWidth),
          normalise(y, canvasHeight),
          0.0,
        ]);
      } else {
        x = x + 1;
        y = y + 1;
        p = p + 2 * dy - 2 * dx;
        createPoint(redFragCode, [
          normalise(x, canvasWidth),
          normalise(y, canvasHeight),
          0.0,
        ]);
      }
      count += 1;
    }
  } else {
    p = 2 * dx - dy;
    while (count < dy) {
      if (p < 0) {
        y = y + 1;
        p = p + 2 * dx;
        createPoint(redFragCode, [
          normalise(x, canvasWidth),
          normalise(y, canvasHeight),
          0.0,
        ]);
      } else {
        x = x + 1;
        y = y + 1;
        p = p + 2 * dx - 2 * dy;
        createPoint(redFragCode, [
          normalise(x, canvasWidth),
          normalise(y, canvasHeight),
          0.0,
        ]);
      }
      count += 1;
    }
  }
}
