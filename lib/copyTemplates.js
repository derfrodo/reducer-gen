const fs = require("fs-extra");

fs.ensureDirSync("./dist");
(async () => {
    await fs.copy(
        "./src/templating/templates/",
        "./dist/templating/templates/",
        {
            recursive: true,
            overwrite: true,
        }
    );
})();
