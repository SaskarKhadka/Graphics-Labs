let frequencies = prompt(
  "Enter upto 10 frequencies(<=500) in the form x, y, z: "
).split(",");

let redFragCode =
  "void main(void)" + "{" + "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" + "}";

grid = 0;
while (grid <= 500) {
  createPoint(redFragCode, [
    normalise(1, canvasWidth),
    normalise(grid, canvasHeight),
    0,
  ]);
  grid += 50;
}

document.querySelector(
  "#frequencies"
).innerHTML = `Frequencies: ${frequencies}`;

let start = 20;
const histogramWidth = 50;

for (let index in frequencies) {
  const frequency = parseInt(frequencies[index]);
  createLineUsingDDA([start, 0], [start, frequency]);
  createLineUsingDDA([start, frequency], [start + histogramWidth, frequency]);
  createLineUsingDDA(
    [start + histogramWidth, 0],
    [start + histogramWidth, frequency]
  );
  start += histogramWidth;
}
