/*
 * Creates a point using the given vertex
 */

function createPoint(vertex, fragCode = greenFragCode) {
  var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(fragShader, fragCode);

  gl.compileShader(fragShader);

  var shaderProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertShader);

  gl.attachShader(shaderProgram, fragShader);

  gl.linkProgram(shaderProgram);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex), gl.STATIC_DRAW);

  var coord = gl.getAttribLocation(shaderProgram, "coordinates");

  gl.enableVertexAttribArray(coord);

  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

  gl.useProgram(shaderProgram);

  gl.drawArrays(gl.POINTS, 0, 1);
}
