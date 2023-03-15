function createLines(referenceLine, rotationAngle) {
    /**
     * Creates 360 lines of same length seperated by 1 degree
     * 
     * If (x, y) is transformed to (x', y') with center (xr, yr)
     * x' = xr + (x - xr) * cos(theta) - (y - yr) * sin(theta)
     * y' = yr + (x - xr) * sin(theta) + (y - yr) * cos(theta)
    */

    let xCenter = referenceLine[0]
    let yCenter = referenceLine[1]

    let lines = [].concat(referenceLine)

    // Previous point indexes
    let prevXIndex = 3
    let prevYIndex = 4

    for (i = 1; i < 360; i += 1) {

        // Insert center for next line
        lines.push(xCenter)
        lines.push(yCenter)
        lines.push(0)

        let prevX = lines[prevXIndex]
        let prevY = lines[prevYIndex]

        // Rotate the previous point by 1 degree
        xTransfromed = xCenter + Math.cos(Math.PI/180 * rotationAngle) * (prevX - xCenter) - Math.sin(Math.PI / 180 * rotationAngle) * (prevY - yCenter) 
        yTransformed = yCenter + Math.sin(Math.PI / 180 * rotationAngle) * (prevX - xCenter) + Math.cos(Math.PI / 180 * rotationAngle) * (prevY - yCenter) 

        // Insert transformed point
        lines.push(xTransfromed)
        lines.push(yTransformed)
        lines.push(0)

        prevXIndex += 6
        prevYIndex += 6
    }
    return lines
}

/*
 * Creates a circle by continously rotating the given line
 */
function createCircle(fragCode, center, rotationAngle = 1) {
    
    let lines = createLines(center, rotationAngle)

    console.log(lines.length)

    let fragShader = gl.createShader(gl.FRAGMENT_SHADER)

    gl.shaderSource(fragShader, fragCode)

    gl.compileShader(fragShader)

    let shaderProgram = gl.createProgram()

    gl.attachShader(shaderProgram, vertShader)

    gl.attachShader(shaderProgram, fragShader)

    gl.linkProgram(shaderProgram)

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lines), gl.STATIC_DRAW)

    let coord = gl.getAttribLocation(shaderProgram, "coordinates")

    gl.enableVertexAttribArray(coord)

    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0)

    gl.useProgram(shaderProgram)

    // Draws 360 lines seperated by 1 degree hence creating a circle
    for (let i = 0; i < lines.length; i = i + 2) {
        gl.drawArrays(gl.LINES, i, 2)
    }

}
