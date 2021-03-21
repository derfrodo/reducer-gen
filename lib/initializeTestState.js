const fs = require("fs-extra");

fs.ensureDirSync("./src/testState/reducer");
fs.emptyDirSync("./src/testState/reducer");
fs.copyFile(
    "./src/testState/original/state.ts",
    "./src/testState/reducer/state.ts"
);
