const fs = require("fs");
const path = require("path");


const text = "Hello, World! This is a sample text written to a file.";


let outputPath = path.join(__dirname, "output.txt");

fs.writeFile(outputPath, text, "utf8", (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("File written successfully.");
});