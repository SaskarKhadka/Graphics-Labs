/*
 * Creates the sun for Nepal's flag
 */

function createSun(fragCode) {

    let referenceLine = [normalise(130, canvasWidth), normalise(140, canvasHeight), 0.0,
        normalise(157, canvasWidth), normalise(140, canvasHeight), 0.0,
    ] 
    createCircle(fragCode, referenceLine, true)

    referenceLine = [normalise(130, canvasWidth), normalise(140, canvasHeight), 0.0,
        normalise(165, canvasWidth), normalise(140, canvasHeight), 0.0,
    ] 

    createRays(fragCode, referenceLine, 8)
}