/**
 * Initializes webgl library
 */

const gl = canvas.getContext("webgl");

if (!gl) {
  throw new Error(
    "Unable to load WebGL. Your computer or browser maynot support it"
  );
}

var vertexBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, null);

var vertCode =
  "attribute vec3 coordinates;" +
  "void main(void)" +
  "{" +
  "gl_Position = vec4(coordinates, 1.0);" +
  "gl_PointSize = 4.0;" +
  "}";

var vertShader = gl.createShader(gl.VERTEX_SHADER);

gl.shaderSource(vertShader, vertCode);

gl.compileShader(vertShader);
