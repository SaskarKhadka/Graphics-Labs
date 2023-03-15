/*
 * Creates the moon for Nepal's flag
 */

function createMoon() {

    var whiteFragCode = 'void main(void)' +
    '{' +
    'gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);' + 
        '}'
    
    var redFragCode = 'void main(void)' +
    '{' +
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);' + 
        '}'

    var referenceLine = [normalise(130, canvasWidth), normalise(340, canvasHeight), 0.0,
        normalise(160, canvasWidth), normalise(340, canvasHeight), 0.0,
    ] 

    createCircle(whiteFragCode, referenceLine)

    referenceLine = [normalise(130, canvasWidth), normalise(353, canvasHeight), 0.0,
        normalise(100, canvasWidth), normalise(353, canvasHeight), 0.0,
    ] 

    createCircle(redFragCode, referenceLine)

    referenceLine = [normalise(130, canvasWidth), normalise(330, canvasHeight), 0.0,
        normalise(115, canvasWidth), normalise(330, canvasHeight), 0.0,
    ] 

    createCircle(whiteFragCode, referenceLine, 1, isSemiCircle = false)
    
    referenceLine = [normalise(130, canvasWidth), normalise(330, canvasHeight), 0.0,
        normalise(150, canvasWidth), normalise(330, canvasHeight), 0.0,
    ] 

    createRays(whiteFragCode, referenceLine, 10)
}