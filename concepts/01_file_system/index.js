const fs = require("fs");
const path = require("path");

// This code uses Node.js's built-in 'fs' module to read the contents of a file named 'example.txt'.
// It specifies 'utf8' encoding to read the file as a string.
// The callback function handles any potential errors and logs the file contents to the console.
console.log(
  __dirname, "\n",
  __filename,"\n",
  path.join(__dirname, "example.txt"),"\n",
  path.basename(__filename),"\n",
  path.extname(__filename),"\n",
  path.resolve("example.txt"),"\n",
);

const inputPath = path.join(__dirname, "example.txt");
fs.readFile(inputPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File contents:", data);
});

const text = "Hello, World! This is a sample text written to a file.";

// let outputPath = 'output.txt';// this will create on working directory means where you are runnning node index.js
let outputPath = path.join(__dirname, "output.txt");

fs.writeFile(outputPath, text, "utf8", (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("File written successfully.");
});

let renamePath = path.join(__dirname, "renamed_output.txt");
fs.rename(outputPath, renamePath, (err) => {
  if (err) {
    console.error("Error renaming file:", err);
    return;
  }
  console.log("File renamed successfully.");
});

fs.unlink(renamePath, (err) => {
  if (err) {
    console.error("Error deleting file:", err);
    return;
  }
  console.log("File deleted successfully.");
});


const filePath = path.parse(path.join(__dirname, "example.txt"));
console.log(filePath);

console.log(path.normalize(path.join(__dirname, "../01_file_system//example.txt"))); // Normalize the path by resolving '..' and redundant slashes.

// All the functions are running in asynchronous way.
// So the order of execution is not guaranteed.
// To ensure sequential execution, you can use nested callbacks, Promises, or async/await.



