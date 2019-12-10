var fs = require("fs");
const testFile = "day-8-input.txt";

const buildLayers = (signal, width, height) => {
  let layers = [];
  let layer = 0;
  while (layer * width * height < signal.length) {
    layers.push(signal.substr(layer * width * height, width * height));
    layer++;
  }
  return layers;
};

const findCode = layers => {
  let [minZeros, minIndex] = [Number.POSITIVE_INFINITY, 0];
  for (let i = 0; i < layers.length; i++) {
    let numZeros = 0;
    for (let char of layers[i]) {
      if (char === "0") {
        numZeros++;
      }
    }
    if (numZeros < minZeros) {
      minZeros = numZeros;
      minIndex = i;
    }
  }

  let [ones, twos] = [0, 0];
  for (let char of layers[minIndex]) {
    if (char === "1") {
      ones++;
    } else if (char === "2") {
      twos++;
    }
  }
  return ones * twos;
};

const decodeImage = layers => {
  let decoded = "";
  for (let p = 0; p < layers[0].length; p++) {
    for (let i = 0; i < layers[0].length; i++) {
      if (i === layers[0].length - 1 || layers[i][p] !== "2") {
        decoded += layers[i][p];
        i = Number.POSITIVE_INFINITY;
      }
    }
  }
  return decoded;
};

const splitRows = (layer, width) => {
  let rows = [];
  let i = 0;
  while (i * width < layer.length) {
    rows.push(layer.substr(i * width, width));
    i++;
  }
  return rows;
};

fs.readFile(testFile, "utf8", function(err, data) {
  if (err) throw err;

  let layers = buildLayers(data, 25, 6);
  let decoded = decodeImage(layers);
  // console.log(decoded);
  let rows = splitRows(decoded, 25);
  for (let row of rows) {
    console.log(
      row
        .replace(/0/g, " ")
        .replace(/1/g, "8")
        .split("")
        .join(" ")
    );
  }
});
