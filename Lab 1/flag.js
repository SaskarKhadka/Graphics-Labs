
// Create traingular body
createTriangularBody('void main(void)' +
'{' +
'gl_FragColor = vec4(1.0, 0.0, 0.0, 0.9);' + 
'}', redTriangleVertices)

// Create blue border
createBorder('void main(void)' +
'{' +
'gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);' + 
    '}')

// Create the sun
createSun('void main(void)' +
'{' +
'gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);' + 
    '}')

// Create the moon
createMoon()

