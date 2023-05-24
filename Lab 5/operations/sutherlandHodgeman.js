const sutherlandHodgemanButton = document.getElementById("sutherland-hodgeman");
sutherlandHodgemanButton.addEventListener("click", () => {
  if (randomPolygonDrawn) {
    sutherlandHodgeman();
  }
});

function createClippedPoints(points) {
  for (let i = 0; i < points.length; i += 2) {
    createPoint([
      normalise(points[i], canvasWidth),
      normalise(points[i + 1], canvasHeight),
      0,
    ]);
  }
}

function sutherlandHodgeman() {
  let clippedPoints = [];
  for (let i = 0; i < polygonVertices.length; i++) {
    line_end_1_x = polygonVertices[i][0];
    line_end_1_y = polygonVertices[i][1];
    line_end_2_x = polygonVertices[(i + 1) % sidesCount][0];
    line_end_2_y = polygonVertices[(i + 1) % sidesCount][1];

    const result = cohenSutherland(true);
    clippedPoints = clippedPoints.concat(result);
  }

  createViewport();
  createPolygon();
  createClippedPoints(clippedPoints);
}
