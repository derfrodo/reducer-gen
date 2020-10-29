// Copyright (c) 2014-present, Facebook, Inc. All rights reserved.

module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current",
                },
            },
        ],
        "@babel/preset-typescript",
    ],
    plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        // ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }],
        ["@babel/plugin-proposal-class-properties", { loose: false }],
    ],
};
