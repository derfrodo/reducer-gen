const fs = require("fs-extra");

fs.remove("./src");

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
