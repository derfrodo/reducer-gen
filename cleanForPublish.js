const fs = require("fs-extra");

fs.remove("./src");
fs.remove("./.vscode");
fs.remove("./node_modules");
fs.remove("clean.js");
fs.remove("cleanForPublish.js");
