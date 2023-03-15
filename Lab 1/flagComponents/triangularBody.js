/*
 * Creates the red traingular body for Nepal's flag
 */

function createTriangularBody(fragCode, vertices) {
    for (let i = 0; i < vertices.length; i = i + 9) {
        createTriangle(fragCode, vertices.slice(i, i+9))
    } 
}