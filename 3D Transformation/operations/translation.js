window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowUp":
      translateY(0.1);
      break;
    case "ArrowDown":
      translateY(-0.1);
      break;
    case "ArrowLeft":
      translateX(-0.1);
      break;
    case "ArrowRight":
      translateX(0.1);
      break;
    case "KeyZ":
      translateZ(0.1);
      break;
    case "KeyX":
      translateZ(-0.1);
      break;
  }
});

function translateX(tx) {
  const tranformarionMatrix = translationMatrix(tx, 0, 0);
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

function translateY(ty) {
  const tranformarionMatrix = translationMatrix(0, ty, 0);
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

function translateZ(tz) {
  const tranformarionMatrix = translationMatrix(0, 0, tz);
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
