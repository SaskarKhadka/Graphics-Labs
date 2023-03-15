/*
 * Creates the blue border for Nepal's flag
 */

function createBorder(fragCode) {
    for (let i = 0; i < lineVertices.length; i = i + 6) {
        createLine(fragCode, lineVertices.slice(i, i+6))
    }
}