module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    "node": process.versions.node
                }
            },
        ],
        "@babel/preset-typescript",
    ],
    plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: false }],
    ],
};
