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
  console.log(vertices);
  createTriangle(vertices);
}

createAxes();
createInitialTriangle();

function translate() {
  document.querySelector(".operation").innerHTML = "Translating by (0.1, 0.1)";
  let translatedVertices = [];
  for (let i = 0; i < vertices.length; i = i + 3) {
    translatedVertices.push(vertices[i] + 0.1);
    translatedVertices.push(vertices[i + 1] + 0.1);
    translatedVertices.push(0);
  }
  vertices = translatedVertices;
  createAxes();
  createTriangle(vertices);
}
function rotate() {
  document.querySelector(".operation").innerHTML =
    "Rotating by 45 degree anticlockwise about origin";
  let rotatedVertices = [];
  for (let i = 0; i < vertices.length; i = i + 3) {
    rotatedVertices.push(
      vertices[i] * Math.cos((Math.PI / 180) * 45) -
        vertices[i + 1] * Math.sin((Math.PI / 180) * 45)
    );
    rotatedVertices.push(
      vertices[i] * Math.sin((Math.PI / 180) * 45) +
        vertices[i + 1] * Math.cos((Math.PI / 180) * 45)
    );
    rotatedVertices.push(0);
  }
  vertices = rotatedVertices;
  createAxes();
  createTriangle(vertices);
}
function scale() {
  document.querySelector(".operation").innerHTML =
    "Scaling by factor (2, 2) aboout origin";
  let scaledVertices = [];
  for (let i = 0; i < vertices.length; i = i + 3) {
    scaledVertices.push(vertices[i] * 2);
    scaledVertices.push(vertices[i + 1] * 2);
    scaledVertices.push(0);
  }
  vertices = scaledVertices;
  createAxes();
  createTriangle(vertices);
}
function reflectX() {
  document.querySelector(".operation").innerHTML = "Reflecting along X-axis";
  let reflectedVertices = [];
  for (let i = 0; i < vertices.length; i = i + 3) {
    reflectedVertices.push(vertices[i]);
    reflectedVertices.push(vertices[i + 1] * -1);
    reflectedVertices.push(0);
  }
  vertices = reflectedVertices;
  createAxes();
  createTriangle(vertices);
}

function reflectY() {
  document.querySelector(".operation").innerHTML = "Reflecting along Y-axis";
  let reflectedVertices = [];
  for (let i = 0; i < vertices.length; i = i + 3) {
    reflectedVertices.push(vertices[i] * -1);
    reflectedVertices.push(vertices[i + 1]);
    reflectedVertices.push(0);
  }
  vertices = reflectedVertices;
  createAxes();
  createTriangle(vertices);
}

function shearX() {
  document.querySelector(".operation").innerHTML = "Shearing along X-axis by 2";
  let reflectedVertices = [];
  for (let i = 0; i < vertices.length; i = i + 3) {
    reflectedVertices.push(vertices[i] + 2 * vertices[i + 1]);
    reflectedVertices.push(vertices[i + 1]);
    reflectedVertices.push(0);
  }
  vertices = reflectedVertices;
  createAxes();
  createTriangle(vertices);
}

function shearY() {
  document.querySelector(".operation").innerHTML = "Shearing along Y-axis by 2";
  let reflectedVertices = [];
  for (let i = 0; i < vertices.length; i = i + 3) {
    reflectedVertices.push(vertices[i]);
    reflectedVertices.push(vertices[i + 1] + 2 * vertices[i]);
    reflectedVertices.push(0);
  }
  createAxes();
  createTriangle(vertices);
}

function reset() {
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
