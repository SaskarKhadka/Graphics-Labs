const translateBtn = document.getElementById("translate");
translateBtn.addEventListener("click", translate);

const rotateBtn = document.getElementById("rotate");
rotateBtn.addEventListener("click", rotate);

const scaleBtn = document.getElementById("scale");
scaleBtn.addEventListener("click", scale);

const reflectXBtn = document.getElementById("reflectX");
reflectXBtn.addEventListener("click", reflectX);

const reflectYBtn = document.getElementById("reflectY");
reflectYBtn.addEventListener("click", reflectY);

const shearXBtn = document.getElementById("shearX");
shearXBtn.addEventListener("click", shearX);

const shearYBtn = document.getElementById("shearY");
shearYBtn.addEventListener("click", shearY);

const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", reset);

function createAxes() {
  createLine([
    normalise(0, canvasWidth),
    normalise(250, canvasHeight),
    0,
    normalise(500, canvasWidth),
    normalise(250, canvasHeight),
    0,
  ]);
  createLine([
    normalise(250, canvasWidth),
    normalise(0, canvasHeight),
    0,
    normalise(250, canvasWidth),
    normalise(500, canvasHeight),
    0,
  ]);
}

function createInitialTriangle() {
  createTriangle(vertices);
}

createAxes();
createInitialTriangle();

function translate() {
  document.querySelector(".operation").innerHTML = "Translating by (0.1, 0.1)";
  const transformationMatrix = translationMatrix(0.1, 0.1);
  let translatedVertices = [];
  for (let i = 0; i < vertices.length; i = i + 3) {
    const result = multiplyMatrices(
      transformationMatrix,
      [[vertices[i]], [vertices[i + 1]], [1]] // homogenous
    );
    translatedVertices.push(result[0]);
    translatedVertices.push(result[1]);
    translatedVertices.push(0);
  }
  vertices = translatedVertices;
  createAxes();
  createTriangle(vertices);
}
function rotate() {
  document.querySelector(".operation").innerHTML =
    "Rotating by 45 degree anticlockwise about origin";
  const transformationMatrix = rotationMatrix((Math.PI / 180) * 45);

  let rotatedVertices = [];
  for (let i = 0; i < vertices.length; i = i + 3) {
    const result = multiplyMatrices(
      transformationMatrix,
      [[vertices[i]], [vertices[i + 1]], [1]] // homogenous
    );
    rotatedVertices.push(result[0]);
    rotatedVertices.push(result[1]);
    rotatedVertices.push(0);
  }
  vertices = rotatedVertices;
  createAxes();
  createTriangle(vertices);
}
function scale() {
  document.querySelector(".operation").innerHTML =
    "Scaling by factor (2, 2) aboout origin";
  const transformationMatrix = scalingMatrix(2, 2);

  let scaledVertices = [];
  for (let i = 0; i < vertices.length; i = i + 3) {
    const result = multiplyMatrices(
      transformationMatrix,
      [[vertices[i]], [vertices[i + 1]], [1]] // homogenous
    );
    scaledVertices.push(result[0]);
    scaledVertices.push(result[1]);
    scaledVertices.push(0);
  }
  vertices = scaledVertices;
  createAxes();
  createTriangle(vertices);
}

function reflectX() {
  document.querySelector(".operation").innerHTML = "Reflecting along X-axis";
  const transformationMatrix = xReflectionMatrix();
  let reflectedVertices = [];
  for (let i = 0; i < vertices.length; i = i + 3) {
    const result = multiplyMatrices(
      transformationMatrix,
      [[vertices[i]], [vertices[i + 1]], [1]] // homogenous
    );
    reflectedVertices.push(result[0]);
    reflectedVertices.push(result[1]);
    reflectedVertices.push(0);
  }
  vertices = reflectedVertices;
  createAxes();
  createTriangle(vertices);
}

function reflectY() {
  document.querySelector(".operation").innerHTML = "Reflecting along Y-axis";
  const transformationMatrix = yReflectionMatrix();
  let reflectedVertices = [];
  for (let i = 0; i < vertices.length; i = i + 3) {
    const result = multiplyMatrices(
      transformationMatrix,
      [[vertices[i]], [vertices[i + 1]], [1]] // homogenous
    );
    reflectedVertices.push(result[0]);
    reflectedVertices.push(result[1]);
    reflectedVertices.push(0);
  }
  vertices = reflectedVertices;
  createAxes();
  createTriangle(vertices);
}

function shearX() {
  document.querySelector(".operation").innerHTML = "Shearing along X-axis by 2";
  const transformationMatrix = xShearMatrix(2);
  let shearedVertices = [];
  for (let i = 0; i < vertices.length; i = i + 3) {
    const result = multiplyMatrices(
      transformationMatrix,
      [[vertices[i]], [vertices[i + 1]], [1]] // homogenous
    );
    shearedVertices.push(result[0]);
    shearedVertices.push(result[1]);
    shearedVertices.push(0);
  }
  vertices = shearedVertices;
  createAxes();
  createTriangle(vertices);
}

function shearY() {
  document.querySelector(".operation").innerHTML = "Shearing along Y-axis by 2";
  const transformationMatrix = yShearMatrix(2);
  let shearedVertices = [];
  for (let i = 0; i < vertices.length; i = i + 3) {
    const result = multiplyMatrices(
      transformationMatrix,
      [[vertices[i]], [vertices[i + 1]], [1]] // homogenous
    );
    shearedVertices.push(result[0]);
    shearedVertices.push(result[1]);
    shearedVertices.push(0);
  }
  vertices = shearedVertices;
  createAxes();
  createTriangle(vertices);
}

function reset() {
  document.querySelector(".operation").innerHTML = "";

  vertices = [
    normalise(250, canvasWidth),
    normalise(250, canvasWidth),
    0,
    normalise(300, canvasWidth),
    normalise(200, canvasWidth),
    0,
    normalise(200, canvasWidth),
    normalise(200, canvasWidth),
    0,
  ];
  createAxes();
  createTriangle(vertices);
}
