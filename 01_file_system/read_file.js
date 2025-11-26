const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "example.txt");
fs.readFile(inputPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File contents:", data);
});



