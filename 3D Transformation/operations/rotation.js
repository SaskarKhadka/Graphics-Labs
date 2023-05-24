window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyQ":
      rotateX((Math.PI / 180) * 10);
      break;
    case "KeyW":
      rotateX(-(Math.PI / 180) * 10);
      break;
    case "KeyA":
      rotateY((Math.PI / 180) * 10);
      break;
    case "KeyS":
      rotateY(-(Math.PI / 180) * 10);
      break;
    case "KeyD":
      rotateZ((Math.PI / 180) * 10);
      break;
    case "KeyF":
      rotateZ(-(Math.PI / 180) * 10);
      break;
  }
});

function rotateX(theta) {
  const tranformarionMatrix = xRotationMatrix(theta);
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

function rotateY(theta) {
  const tranformarionMatrix = yRotationMatrix(theta);
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

function rotateZ(theta) {
  const tranformarionMatrix = yRotationMatrix(theta);
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
