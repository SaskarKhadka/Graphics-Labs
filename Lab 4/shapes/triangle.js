/*
 * Creates the triangle using the given vertices
 */

function createTriangle(
  vertices,
  fragCode = "void main(void)" +
    "{" +
    "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" +
    "}"
) {
  var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(fragShader, fragCode);

  gl.compileShader(fragShader);

  var shaderProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertShader);

  gl.attachShader(shaderProgram, fragShader);

  gl.linkProgram(shaderProgram);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  var coord = gl.getAttribLocation(shaderProgram, "coordinates");

  gl.enableVertexAttribArray(coord);

  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

  gl.useProgram(shaderProgram);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
