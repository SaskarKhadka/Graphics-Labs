let initialCubeVertices = [
  // Face 1
  0, 0, 0.5, 0.5, 0, 0.5, 0.5, 0.5, 0.5, 0, 0, 0.5, 0, 0.5, 0.5, 0.5, 0.5, 0.5,

  // Face 2
  0, 0, 0, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 0, 0.5, 0.5, 0, 0, 0.5,

  // Face 3
  0.5, 0.5, 0.5, 0.5, 0, 0, 0.5, 0, 0.5, 0.5, 0, 0, 0.5, 0.5, 0.5, 0.5, 0.5, 0,

  // Face 4
  0, 0, 0, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0, 0, 0, 0.5, 0, 0.5, 0.5, 0,

  // Face 5
  0.5, 0.5, 0.5, 0, 0.5, 0.5, 0.5, 0.5, 0, 0, 0.5, 0.5, 0.5, 0.5, 0, 0, 0.5, 0,

  // Face 6
  0, 0, 0, 0, 0, 0.5, 0.5, 0, 0.5, 0, 0, 0, 0.5, 0, 0.5, 0.5, 0, 0,
];

let transformedCube;

const faceColors = [
  pinkFragCode,
  pinkFragCode,
  redFragCode,
  redFragCode,
  greenFragCode,
  greenFragCode,
  blueFragCode,
  blueFragCode,
  yellowFragCode,
  yellowFragCode,
  whiteFragCode,
  whiteFragCode,
];

function drawCube(vertices) {
  transformedCube = vertices;
  let face = 0;
  for (let i = 0; i < vertices.length; i += 9) {
    createTriangle(vertices.slice(i, i + 9), (fragCode = faceColors[face]));
    face++;
  }
}

drawCube(initialCubeVertices);
