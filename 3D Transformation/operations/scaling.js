window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyJ":
      scaleX(1.5);
      break;
    case "KeyK":
      scaleY(1.5);
      break;
    case "KeyL":
      scaleZ(1.5);
      break;
  }
});

function scaleX(sx) {
  const tranformarionMatrix = scalingMatrix(sx, 1, 1);
  let newCubeVertices = [];

  for (let i = 0; i < transformedCube.length; i += 3) {
    const result = multiplyMatrices(tranformarionMatrix, [
      [transformedCube[i]],
      [transformedCube[i + 1]],
      [transformedCube[i + 2]],
      [1],
    ]);
    newCubeVertices.push(result[0]);
    newCubeVertices.push(result[1]);
    newCubeVertices.push(result[2]);
  }
  drawCube(newCubeVertices);
}

function scaleY(sy) {
  const tranformarionMatrix = yRotationMatrix(1, sy, 1);
  let newCubeVertices = [];

  for (let i = 0; i < transformedCube.length; i += 3) {
    const result = multiplyMatrices(tranformarionMatrix, [
      [transformedCube[i]],
      [transformedCube[i + 1]],
      [transformedCube[i + 2]],
      [1],
    ]);
    newCubeVertices.push(result[0]);
    newCubeVertices.push(result[1]);
    newCubeVertices.push(result[2]);
  }
  drawCube(newCubeVertices);
}

function scaleZ(sz) {
  const tranformarionMatrix = yRotationMatrix(1, 1, sz);
  let newCubeVertices = [];

  for (let i = 0; i < transformedCube.length; i += 3) {
    const result = multiplyMatrices(tranformarionMatrix, [
      [transformedCube[i]],
      [transformedCube[i + 1]],
      [transformedCube[i + 2]],
      [1],
    ]);
    newCubeVertices.push(result[0]);
    newCubeVertices.push(result[1]);
    newCubeVertices.push(result[2]);
  }
  drawCube(newCubeVertices);
}
