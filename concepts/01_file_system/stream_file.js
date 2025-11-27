// const fs = require("fs");
// const path = require("path");


// const sourcePath = path.join(__dirname, "example.txt");
// const destinationPath = path.join(__dirname, "destination.txt");

// const readStream = fs.createReadStream(sourcePath, "utf8");
// const writeStream = fs.createWriteStream(destinationPath, "utf8");

// readStream.pipe(writeStream);

// readStream.on("error", (err) => {
//   console.error("Error reading source file:", err);
// });

// writeStream.on("error", (err) => {
//   console.error("Error writing to destination file:", err);
// });

// writeStream.on("finish", () => {
//   console.log("File streamed successfully from source.txt to destination.txt");
// });
// readStream.on("end", () => {
//   console.log("Read stream ended.");
// });
// writeStream.on("close", () => {
//   console.log("Write stream closed.");
// }); 

// // Note: Ensure that 'source.txt' exists in the same directory as this script before running it.



const express = require("express");
const path = require("path");
const app = express();

// Serve static files from "public"
app.use(express.static(path.join(__dirname, "public")));

// Explicitly serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


module.exports = app;
