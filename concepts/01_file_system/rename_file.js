const fs = require("fs");
const path = require("path");

let renamePath = path.join(__dirname, "renamed_output.txt");
fs.rename(outputPath, renamePath, (err) => {
  if (err) {
    console.error("Error renaming file:", err);
    return;
  }
  console.log("File renamed successfully.");
});

