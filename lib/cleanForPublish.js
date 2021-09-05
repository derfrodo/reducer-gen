const fs = require("fs-extra");

fs.removeSync("./README.md");
fs.copyFileSync("../README.md", "./README.md");
// fs.removeSync("./src");
// fs.removeSync("./dist/__mocks__");
// fs.removeSync("./dist/testState");
// fs.removeSync("./dist/util/models/test");

// if (fs.existsSync("./.git")) {
//     fs.removeSync("./.git");
// }
// if (fs.existsSync("./.github")) {
//     fs.removeSync("./.github");
// }
// fs.removeSync("./.vscode");
// fs.removeSync("./node_modules");
// fs.removeSync("clean.js");
// fs.removeSync("cleanForPublish.js");
