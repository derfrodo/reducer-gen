const fs = require("fs-extra");

fs.remove("./README.md");
fs.copyFile("../README.md", "./README.md");
fs.remove("./src");
fs.remove("./dist/__mocks__");
fs.remove("./dist/testState");
fs.remove("./dist/util/models/test");

if (fs.existsSync("./.git")) {
    fs.remove("./.git");
}
if (fs.existsSync("./.github")) {
    fs.remove("./.github");
}
fs.remove("./.vscode");
fs.remove("./node_modules");
fs.remove("clean.js");
fs.remove("cleanForPublish.js");
