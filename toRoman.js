var intToRoman = function(num) {
  const symbols = {
    "1": "I",
    "4": "IV",
    "5": "V",
    "9": "IV",
    "10": "X",
    "40": "XL",
    "50": "L",
    "90": "XC",
    "100": "C",
    "400": "CD",
    "500": "D",
    "900": "CM",
    "1000": "M"
  };

  let values = Object.keys(symbols)
    .sort((a, b) => +b - +a)
    .map(val => +val);
  // console.log(values);
  let roman = "";

  let i = 0;
  while (num > 0 && i < values.length) {
    if (num >= values[i]) {
      num -= values[i];
      roman += symbols[values[i]];
    } else {
      i++;
    }
  }

  return roman;
};

console.log(intToRoman(1994));
