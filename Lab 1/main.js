/**
 * Entry point
 * Defines the canvas and traingles and border vertices 
 */

const canvas = document.querySelector("#canvas");

const canvasHeight = canvas.height
const canvasWidth = canvas.width

function normalise(pos, axis) {
    const halfAxis = axis / 2
    let normalised = pos / halfAxis - 1
    return normalised
}

let redTriangleVertices = [
    // Triangles
    normalise(50, canvasWidth), normalise(450, canvasHeight), 0.0,
    normalise(350, canvasWidth), normalise(300, canvasHeight), 0.0,
    normalise(50, canvasWidth), normalise(250, canvasHeight), 0.0,
    normalise(50, canvasWidth), normalise(280, canvasHeight), 0.0,
    normalise(350, canvasWidth), normalise(100, canvasHeight), 0.0,
    normalise(50, canvasWidth), normalise(50, canvasHeight), 0.0,
]

let lineVertices = [
    // 3 pixel blue Lines
    normalise(50, canvasWidth), normalise(451, canvasHeight), 0.0,
    normalise(350, canvasWidth), normalise(299, canvasHeight), 0.0,
    normalise(50, canvasWidth), normalise(452, canvasHeight), 0.0,
    normalise(350, canvasWidth), normalise(300, canvasHeight), 0.0,
    normalise(50, canvasWidth), normalise(453, canvasHeight), 0.0,
    normalise(350, canvasWidth), normalise(301, canvasHeight), 0.0,

    normalise(90, canvasWidth), normalise(256, canvasHeight), 0.0,
    normalise(351, canvasWidth), normalise(300, canvasHeight), 0.0,
    normalise(90, canvasWidth), normalise(255, canvasHeight), 0.0,
    normalise(351, canvasWidth), normalise(299, canvasHeight), 0.0,
    normalise(90, canvasWidth), normalise(254, canvasHeight), 0.0,
    normalise(351, canvasWidth), normalise(298, canvasHeight), 0.0,

    normalise(90, canvasWidth), normalise(255, canvasHeight), 0.0,
    normalise(350, canvasWidth), normalise(100, canvasHeight), 0.0,
    normalise(90, canvasWidth), normalise(256, canvasHeight), 0.0,
    normalise(350, canvasWidth), normalise(101, canvasHeight), 0.0,
    normalise(90, canvasWidth), normalise(257, canvasHeight), 0.0,
    normalise(350, canvasWidth), normalise(102, canvasHeight), 0.0,

    normalise(350, canvasWidth), normalise(100, canvasHeight), 0.0,
    normalise(48, canvasWidth), normalise(50, canvasHeight), 0.0,
    normalise(350, canvasWidth), normalise(99, canvasHeight), 0.0,
    normalise(48, canvasWidth), normalise(49, canvasHeight), 0.0,
    normalise(350, canvasWidth), normalise(98, canvasHeight), 0.0,
    normalise(48, canvasWidth), normalise(48, canvasHeight), 0.0,

    normalise(50, canvasWidth), normalise(50, canvasHeight), 0.0,
    normalise(50, canvasWidth), normalise(453, canvasHeight), 0.0,
    normalise(49, canvasWidth), normalise(50, canvasHeight), 0.0,
    normalise(49, canvasWidth), normalise(453, canvasHeight), 0.0,
    normalise(48, canvasWidth), normalise(50, canvasHeight), 0.0,
    normalise(48, canvasWidth), normalise(453, canvasHeight), 0.0,
]
