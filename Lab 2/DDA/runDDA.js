let startingVertex = prompt(
  "Enter starting vertex in the form x, y [(0,0) to (500, 500)]: "
).split(",");
let endingVertex = prompt(
  "Enter ending vertex in the form x, y [(0,0) to (500, 500)]: "
).split(",");

createLineUsingDDA(startingVertex, endingVertex);
