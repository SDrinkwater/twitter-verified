const fs = require("fs");
const csv = require("csv-parser");

// CSV file path
const csvFilePath = "../data/legacy-verified.csv";

// Directory in which to create symlinks
const symlinkDir = ".";

// File to target
const targetPath = `../assets/legacy-verified.svg`;

const writeLimit = 1000;
let writeCount = 0;

// Read the CSV file
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (user) => {
    writeCount++;
    if (writeCount > writeLimit) {
      return;
    }
    // Create the symlink
    fs.symlink(targetPath, `${symlinkDir}/${user.id}`, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`${user.id} created successfully`);
    });
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });
