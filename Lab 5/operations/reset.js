const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", reset);

function reset() {
  randomLineDrawn = false;
  randomPolygonDrawn = false;
  createViewport();
}
