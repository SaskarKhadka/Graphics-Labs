const multiplyMatrices = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) {
    throw new Error("arguments should be in 2-dimensional array format");
  }
  let x = a.length,
    z = a[0].length,
    y = b[0].length;
  if (b.length !== z) {
    // XxZ & ZxY => XxY
    throw new Error(
      "number of columns in the first matrix should be the same as the number of rows in the second"
    );
  }
  let productRow = Array.apply(null, new Array(y)).map(
    Number.prototype.valueOf,
    0
  );
  let product = new Array(x);
  for (let p = 0; p < x; p++) {
    product[p] = productRow.slice();
  }
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      for (let k = 0; k < z; k++) {
        product[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return product;
};

function translationMatrix(tx = 0, ty = 0, tz = 0) {
  return [
    [1, 0, 0, tx],
    [0, 1, 0, ty],
    [0, 0, 1, tz],
    [0, 0, 0, 1],
  ];
}

function scalingMatrix(sx = 1, sy = 1, sz = 1) {
  return [
    [sx, 0, 0, 0],
    [0, sy, 0, 0],
    [0, 0, sz, 0],
    [0, 0, 0, 1],
  ];
}

function xRotationMatrix(theta) {
  return [
    [1, 0, 0, 0],
    [0, Math.cos(theta), -1 * Math.sin(theta), 0],
    [0, Math.sin(theta), Math.cos(theta), 0],
    [0, 0, 0, 1],
  ];
}

function yRotationMatrix(theta) {
  return [
    [Math.cos(theta), 0, Math.sin(theta), 0],
    [0, 1, 0, 0],
    [-1 * Math.sin(theta), 0, Math.cos(theta), 0],
    [0, 0, 0, 1],
  ];
}

function zRotationMatrix(theta) {
  return [
    [Math.cos(theta), -1 * Math.sin(theta), 0, 0],
    [Math.sin(theta), Math.cos(theta), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
}
