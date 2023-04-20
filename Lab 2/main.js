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
