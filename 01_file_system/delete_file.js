const fs = require("fs");
const path = require("path");

let renamePath = path.join(__dirname, "renamed_output.txt");

fs.unlink(renamePath, (err) => {
  if (err) {
    console.error("Error deleting file:", err);
    return;
  }
  console.log("File deleted successfully.");
});