if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}
// Read the file and print its contents.
var fs = require("fs"),
  filename = process.argv[2];
fs.readFile(filename, "utf8", function(err, data) {
  if (err) throw err;
  console.log("OK: " + filename);

  const findFuelRecursive = mass => {
    let fuel = ((mass / 3) | 0) - 2;
    return fuel > 0 ? fuel + findFuelRecursive(fuel) : 0;
  };

  let total = data
    .split("\n")
    .reduce((memo, m) => memo + findFuelRecursive(m), 0);
  console.log(total);
});
