# @derfrodo/reducer-gen

[![npm](https://img.shields.io/npm/v/@derfrodo/reducer-gen)](https://www.npmjs.com/package/@derfrodo/reducer-gen) 
[![weekly downloads](https://img.shields.io/npm/dw/@derfrodo/reducer-gen)](https://www.npmjs.com/package/@derfrodo/reducer-gen)
![Compile Action](https://github.com/derfrodo/reducer-gen/workflows/Node.js%20CI%20Lets%20try%20an%20action/badge.svg)

## Installation
```
npm install --save-dev @derfrodo/reducer-gen
```

Installation guides will follow (hopefully soon)

## Migration from 0.1.x to 0.2.x

### Actions modules and variables has been renamed to be "actions" instead of "action". 
You may have to adjust file names for extended actions to match this requirements. Also you will need to rename your extended actions themselves.
Imports may break (do not worry: Just change "actions" in the generated documents to "action" and perform the renaming with typescript. Everything should follow this renaming, then 😊 )

### extended Reducers are expected to be exported as named exports
just add ```export``` to your extended reducer constant

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
-   addArrayFunctions (default: true)
-   addBubbleFlagForActions (default: true)
-   decoupleStateChangedCallbackByTimeout (default: false)

### Deprecated Arguments, which will more or less do nothing (... sensible 😅 )
-   generateSyncStateActions (default: false, deprecated - use @derfrodo/call-for-action 🤗)
-   generateWebAppHybridHooks (default: false, deprecated - use @derfrodo/call-for-action 🤗)
-   generateReactNativeHybridHooks (default: false, deprecated - use @derfrodo/call-for-action 🤗)

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
