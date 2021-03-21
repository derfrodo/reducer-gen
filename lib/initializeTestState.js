const fs = require("fs-extra");

fs.removeSync("./src/testState/reducer");
fs.copyFile(
    "./src/testState/original/state.ts",
    "./src/testState/reducer/state.ts"
);
