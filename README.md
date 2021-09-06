# @derfrodo/reducer-gen

[![npm](https://img.shields.io/npm/v/@derfrodo/reducer-gen)](https://www.npmjs.com/package/@derfrodo/reducer-gen)
[![weekly downloads](https://img.shields.io/npm/dw/@derfrodo/reducer-gen)](https://www.npmjs.com/package/@derfrodo/reducer-gen)
[![Create Publishable Bundle](https://github.com/derfrodo/reducer-gen/actions/workflows/createPublishableBundle.yml/badge.svg)](https://github.com/derfrodo/reducer-gen/actions/workflows/createPublishableBundle.yml)

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

just add `export` to your extended reducer constant

## Quick Start

call via package.json script:

### Add in package.json

```json
{
    ...
    "scripts":
        {...
            "generateReducers": "reducer-gen --loglevel debug"
        ...}
}
```

_package.json_

### ...then use the script 🎉

```cli
npm run generateReducers
```

_in cli_

### Arguments for cli

- loglevel: logLevelChoices
- filesSuffix (default: ".base.generated" )
- filesPrefix (default: "" )
- mainFilesSuffix (default: ".main.generated" )
- mainFilesPrefix (default: "" )
- createReducerContext (default: false)
- addArrayFunctions (default: true)
- addBubbleFlagForActions (default: true)
- decoupleStateChangedCallbackByTimeout (default: false)

### Deprecated Arguments, which will more or less do nothing (... sensible 😅 )

- generateSyncStateActions (default: false, deprecated - use @derfrodo/call-for-action 🤗)
- generateWebAppHybridHooks (default: false, deprecated - use @derfrodo/call-for-action 🤗)
- generateReactNativeHybridHooks (default: false, deprecated - use @derfrodo/call-for-action 🤗)

``` javascript
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

## Roadmap / Todos

In case you have some spare time to invest it into this project: There are some things, we may accomplish in this library still. 😎

- [ ] Allow templates to be passed
  - Templates (handlebar syntax) should be able to be passed to this generator, so we may generate also code for other languages
- [ ] create "useStatish" hooks
  - I think of them as _easy to use_ hooks for state management without importing all stuff like dispatch, action creators etc all the time (e.g ```const [currentProp, setProp] = useNamedStateProperty("propertyName)```)
  - Keep in mind, that we want to keep using reducers like in redux and React reducers-hooks, so that using projects will always be able to opt out easily from this lib.
  - I do not want to establish another global state framework here ☝
- [ ] Define an github action to perform all tests and create zip files
  - Archives will contain "publishable" node-packages of the current version, so we do not have to do this locally all the time
- [ ] Add unittests
  - Currently the coverage is horrible - as are the tests themselves.
