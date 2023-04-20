/**
 * Creates an ellipse using the Midpoint Algorithm
 */

function createEllipseUsingMidpointAlgo(rx, ry, center) {
  let x = 0;
  let y = ry;

  const xc = parseInt(center[0]);
  const yc = parseInt(center[1]);

  let vertices = [];

  let p1 = Math.pow(ry, 2) - Math.pow(rx, 2) * ry + (1 / 4) * Math.pow(rx, 2);

  let limitCondn1 = 2 * Math.pow(ry, 2) * x;
  let limitCondn2 = 2 * Math.pow(rx, 2) * y;

  vertices.push([x, y]);

  while (limitCondn1 <= limitCondn2) {
    if (p1 < 0) {
      x = x + 1;
      p1 = p1 + 2 * Math.pow(ry, 2) * x + Math.pow(ry, 2);
    } else {
      x = x + 1;
      y = y - 1;
      p1 =
        p1 +
        2 * Math.pow(ry, 2) * x +
        Math.pow(ry, 2) -
        2 * Math.pow(rx, 2) * y;
    }
    limitCondn1 = 2 * Math.pow(ry, 2) * x;
    limitCondn2 = 2 * Math.pow(rx, 2) * y;
    vertices.push([x, y]);
  }

  let p2 =
    Math.pow(ry, 2) * Math.pow(x + 1 / 2, 2) +
    Math.pow(rx, 2) * Math.pow(y - 1, 2) -
    Math.pow(rx, 2) * Math.pow(ry, 2);

  vertices.push([x, y]);

  while (y != 0) {
    if (p2 <= 0) {
      x = x + 1;
      y = y - 1;
      p2 =
        p2 +
        2 * Math.pow(ry, 2) * x -
        2 * Math.pow(rx, 2) * y +
        Math.pow(rx, 2);
    } else {
      y = y - 1;
      p2 = p2 + Math.pow(rx, 2) - 2 * Math.pow(rx, 2) * y;
    }
    vertices.push([x, y]);
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
      normalise(xc - x, canvasWidth),
      normalise(yc + y, canvasHeight),
      0,
    ]);
    createPoint([
      normalise(xc + x, canvasWidth),
      normalise(yc - y, canvasHeight),
      0,
    ]);
    createPoint([
      normalise(xc - x, canvasWidth),
      normalise(yc - y, canvasHeight),
      0,
    ]);
  }
}
