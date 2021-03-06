# @derfrodo/reducer-gen

[![npm](https://img.shields.io/npm/v/@derfrodo/reducer-gen)](https://www.npmjs.com/package/@derfrodo/reducer-gen) 
[![weekly downloads](https://img.shields.io/npm/dw/@derfrodo/reducer-gen)](https://www.npmjs.com/package/@derfrodo/reducer-gen)
![Compile Action](https://github.com/derfrodo/reducer-gen/workflows/Node.js%20CI%20Lets%20try%20an%20action/badge.svg)

## Installation
```
npm install --save-dev @derfrodo/reducer-gen
```

Installation guides will follow (hopefully soon)

## Quick Start
call via package.json script:  

*package.json*
``` json 
{
    ...
    "scripts":
        {...
            "generateReducers": "reducer-gen --loglevel debug"
        ...}
}
```
*in cli*
``` cli 
npm run generateReducers
```


### Arguments for cli:

-   loglevel: logLevelChoices
-   filesSuffix (default: ".base.generated" )
-   filesPrefix (default: "" )
-   mainFilesSuffix (default: ".main.generated" )
-   mainFilesPrefix (default: "" )
-   createReducerContext (default: false)

```
 logLevelChoices = [
    0,
    "TRACE",
    "DEBUG",
    "INFO",
    "WARN",
    "ERROR",
    "SILENT",
    1,
    2,
    3,
    4,
    5,
    "trace",
    "debug",
    "info",
    "warn",
    "error",
    "silent",
];
```

## For me ;)

@frodo: npm publish --access public
