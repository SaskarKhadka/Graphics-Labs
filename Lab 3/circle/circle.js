/**
 * Creates a circle using the Midpoint Algorithm
 */

function createCircleUsingMidpointAlgo(radius, center) {
  let x = 0;
  let y = radius;

  const xc = parseInt(center[0]);
  const yc = parseInt(center[1]);

  let vertices = [];

  let p = 1 - radius;

  while (x <= y) {
    vertices.push([x, y]);
    if (p < 0) {
      x = x + 1;
      p = p + 2 * x + 1;
    } else {
      x = x + 1;
      y = y - 1;
      p = p + 2 * x + 1 - 2 * y;
    }
  }

  for (let index in vertices) {
    let coordinate = vertices[index];
    let x = coordinate[0];
    let y = coordinate[1];
    createPoint([
      normalise(xc + x, canvasWidth),
      normalise(yc + y, canvasHeight),
      0,
    ]);
    createPoint([
      normalise(xc + y, canvasWidth),
      normalise(yc + x, canvasHeight),
      0,
    ]);
    createPoint([
      normalise(xc - x, canvasWidth),
      normalise(yc + y, canvasHeight),
      0,
    ]);
    createPoint([
      normalise(xc - y, canvasWidth),
      normalise(yc + x, canvasHeight),
      0,
    ]);
    createPoint([
      normalise(xc + x, canvasWidth),
      normalise(yc - y, canvasHeight),
      0,
    ]);
    createPoint([
      normalise(xc + y, canvasWidth),
      normalise(yc - x, canvasHeight),
      0,
    ]);
    createPoint([
      normalise(xc - x, canvasWidth),
      normalise(yc - y, canvasHeight),
      0,
    ]);
    createPoint([
      normalise(xc - y, canvasWidth),
      normalise(yc - x, canvasHeight),
      0,
    ]);
  }
}
