const cohenSutherlandButton = document.getElementById("cohen-sutherland");
cohenSutherlandButton.addEventListener("click", () => {
  if (randomLineDrawn) {
    cohenSutherland();
  }
});

function computeRegionCode(x, y) {
  let regionCode = "";

  // T
  if (y > YW_MAX) regionCode += "1";
  else regionCode += "0";

  // B
  if (y < YW_MIN) regionCode += "1";
  else regionCode += "0";

  // R
  if (x > XW_MAX) regionCode += "1";
  else regionCode += "0";

  // L
  if (x < XW_MIN) regionCode += "1";
  else regionCode += "0";

  return regionCode;
}

function andOperation(num1, num2) {
  let result = "";
  for (let i = 0; i < num1.length; i++) {
    if (num1[i] === "1" && num2[i] === "1") {
      result += "1";
    } else {
      result += "0";
    }
  }
  return result;
}

function clipLine(regionCode, x, y, slope) {
  let xPrime;
  let yPrime;
  if (regionCode[0] == "1") {
    // Intersection with top boundary
    xPrime = x + (YW_MAX - y) / slope;
    yPrime = YW_MAX;
  } else if (regionCode[1] == "1") {
    // Intersection with bottom boundary
    xPrime = x + (YW_MIN - y) / slope;
    yPrime = YW_MIN;
  } else if (regionCode[2] == "1") {
    // Intersection with right boundary
    yPrime = y + (XW_MAX - x) * slope;
    xPrime = XW_MAX;
  } else {
    // Intersection with left boundary
    yPrime = y + (XW_MIN - x) * slope;
    xPrime = XW_MIN;
  }
  return { x: xPrime, y: yPrime };
}

function draw(end_1_x, end_1_y, end_2_x, end_2_y) {
  createViewport();
  createLine(
    [
      normalise(line_end_1_x, canvasWidth),
      normalise(line_end_1_y, canvasHeight),
      0,
      normalise(line_end_2_x, canvasWidth),
      normalise(line_end_2_y, canvasHeight),
      0,
    ],
    (fragCode = redFragCode)
  );
  createPoint([
    normalise(end_1_x, canvasWidth),
    normalise(end_1_y, canvasHeight),
    0,
  ]);
  createPoint([
    normalise(end_2_x, canvasWidth),
    normalise(end_2_y, canvasHeight),
    0,
  ]);
}

function cohenSutherland(hodgemanCall = false) {
  // Compute region code
  let regionCode1 = computeRegionCode(line_end_1_x, line_end_1_y);
  let regionCode2 = computeRegionCode(line_end_2_x, line_end_2_y);

  const slope = (line_end_2_y - line_end_1_y) / (line_end_2_x - line_end_1_x);
  let clipped_end_1_x = line_end_1_x;
  let clipped_end_1_y = line_end_1_y;
  let clipped_end_2_x = line_end_2_x;
  let clipped_end_2_y = line_end_2_y;

  while (true) {
    if (regionCode1 === "0000" && regionCode2 === "0000") {
      // Trivial accept
      if (hodgemanCall) {
        return [
          clipped_end_1_x,
          clipped_end_1_y,
          clipped_end_2_x,
          clipped_end_2_y,
        ];
      }
      draw(clipped_end_1_x, clipped_end_1_y, clipped_end_2_x, clipped_end_2_y);
      break;
    }
    // And operation
    const result = andOperation(regionCode1, regionCode2);

    if (result != "0000") {
      // Trivial reject condition
      if (hodgemanCall) return [];
      break;
    }

    if (regionCode1 != "0000") {
      // choose endpoint 1
      const { x, y } = clipLine(
        regionCode1,
        clipped_end_1_x,
        clipped_end_1_y,
        slope
      );

      // Replace endpoint 1
      clipped_end_1_x = x;
      clipped_end_1_y = y;

      // Update region code
      regionCode1 = computeRegionCode(x, y);
    } else {
      // choose endpoint 2
      const { x, y } = clipLine(
        regionCode2,
        clipped_end_2_x,
        clipped_end_2_y,
        slope
      );

      // Replace endpoint 2
      clipped_end_2_x = x;
      clipped_end_2_y = y;

      // Update region code
      regionCode2 = computeRegionCode(x, y);
    }
  }
}
