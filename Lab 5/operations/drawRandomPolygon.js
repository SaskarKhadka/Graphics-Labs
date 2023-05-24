let polygonVertices = [];
let sidesCount = 4;

function drawRandomPolygon() {
  let vertices = [];
  randomPolygonDrawn = true;
  randomLineDrawn = false;
  for (let i = 0; i < sidesCount; i++) {
    const x = Math.floor(Math.random() * (X_MAX - X_MIN + 1) + X_MIN);
    const y = Math.floor(Math.random() * (Y_MAX - Y_MIN + 1) + Y_MIN);

    vertices.push([x, y]);
  }
  polygonVertices = vertices;
  createViewport();
  createPolygon();
}

function createPolygon() {
  for (let i = 0; i < polygonVertices.length; i++) {
    createLine(
      [
        normalise(polygonVertices[i][0], canvasWidth),
        normalise(polygonVertices[i][1], canvasHeight),
        0,
        normalise(polygonVertices[(i + 1) % sidesCount][0], canvasWidth),
        normalise(polygonVertices[(i + 1) % sidesCount][1], canvasHeight),
        0,
      ],
      (fragCode = redFragCode)
    );
  }
}

const randomPolygonButton = document.getElementById("random-polygon");
randomPolygonButton.addEventListener("click", drawRandomPolygon);
