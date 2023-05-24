/**
 * Entry point
 * Defines the canvas
 */

const canvas = document.querySelector("#canvas");

const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

function normalise(pos, axis) {
  /**
   * Converts device coordinates to normalised coordinates
   */
  const halfAxis = axis / 2;
  let normalised = pos / halfAxis - 1;
  return normalised;
}

/**
 * Vertices for the original triangle
 */
let vertices = [
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

const redFragCode =
  "void main(void)" + "{" + "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" + "}";

const blueFragCode =
  "void main(void)" + "{" + "gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);" + "}";

const greenFragCode =
  "void main(void)" + "{" + "gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);" + "}";

const whiteFragCode =
  "void main(void)" + "{" + "gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);" + "}";
