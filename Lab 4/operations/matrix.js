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

function translationMatrix(tx = 0, ty = 0) {
  // In homogenous
  return [
    [1, 0, tx],
    [0, 1, ty],
    [0, 0, 1],
  ];
}

function scalingMatrix(sx = 1, sy = 1) {
  // In homogenous
  return [
    [sx, 0, 0],
    [0, sy, 0],
    [0, 0, 1],
  ];
}

function rotationMatrix(theta) {
  // In homogenous
  return [
    [Math.cos(theta), -1 * Math.sin(theta), 0],
    [Math.sin(theta), Math.cos(theta), 0],
    [0, 0, 1],
  ];
}

function xReflectionMatrix(theta) {
  // In homogenous
  return [
    [1, 0, 0],
    [0, -1, 0],
    [0, 0, 1],
  ];
}

function yReflectionMatrix(theta) {
  // In homogenous
  return [
    [-1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
}

function xShearMatrix(shx) {
  // In homogenous
  return [
    [1, shx, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
}

function yShearMatrix(shy) {
  // In homogenous
  return [
    [1, 0, 0],
    [shy, 1, 0],
    [0, 0, 1],
  ];
}
