/**
 * Creates a line using the DDA Algorithm
 */

function createLineUsingDDA(startingVertex, endingVertex) {
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

  let stepsize = Math.abs(dx);

  if (Math.abs(dx) <= Math.abs(dy)) {
    stepsize = Math.abs(dy);
  }

  let xinc = dx / stepsize;
  let yinc = dy / stepsize;

  let i = 0;

  while (i < stepsize) {
    x = x + xinc;
    y = y + yinc;
    createPoint(redFragCode, [
      normalise(x, canvasWidth),
      normalise(y, canvasHeight),
      0.0,
    ]);
    i += 1;
  }
}
