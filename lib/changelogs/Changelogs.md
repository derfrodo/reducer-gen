# Changelog 

## Version 0.5.8-beta:
- Add parameter ```addGetCurrentStateToContext``` to create an option to directly access current state
- Add parameter ```addFunctionalParametersForContextDispatch``` to create an option to change data due to current state via direct property handling
- BREAKING: missing ContextProvider will lead to errors while calling dispatch or any other functions of it by default
  - Applies if ReducerContext is generated (and therfore no redux is used)
  - Having the reducer hooks running without context provider does not make sense anyway

## Version 0.4.7:
- Fix dependency vulnerabilities

## Version 0.4.6:
- Fix issue in template for Direct property Types

## Version 0.4.4-beta:
- Sparkling pipelines

## Version 0.4.3-beta:
- Fix issue when state is not recognized as default export

## Version 0.4.2-beta:
- Enhanced Typing for [FeatureName]StateProperties

## Version 0.4.1-beta:
- Add alias useNamed[Feature]StateProperty for useDirectProperty hooks

## Version 0.4.0-beta:
- Add [FeatureName]StateProperties as Object.freeze for better future refactoring when renaming properties

## Version 0.3.8-beta:
- Start with autodeployment

## Version 0.3.7-beta:
- Better types ...

## Version 0.3.6-beta:
- Better types ...
- Add typeguard for State property => Not used yet

## Version 0.3.2-beta:
- Better types 

## Version 0.3.1-beta:
- Fix compile errors due to template 

## Version 0.3.0-beta:
- Add new hook "useDirectPropertyValue". Use it by passing ```--createContextDirectPropertyHooks``` to cli
- Since this is a cool thing, minor has been raised to .3 🎉

## Version 0.2.37-beta:
- Fix compile errors due to template 

## Version 0.2.36-beta:
- Formattings 

## Version 0.2.35-beta:
- Fix compile errors due to template 

## Version 0.2.34-beta:
- Extend readme 

## Version 0.2.33-beta:
- Add new hook "useDirectProperty". Use it by passing ```--createContextDirectPropertyHooks``` to cli

## Version 0.2.33:
- Just full version

## Version 0.2.32-beta
- unknown over any in template

## Version 0.2.31-beta
- just apply beta, so that versioning is clean ;)

## Version 0.2.30
- change reducer logic in template, so that action type is checked before calling base or extended reducers

## Version 0.2.29
- add content to readme
- performed ```npm audit fix```

## Version 0.2.28
- even more testing

## Version 0.2.27
- rename parameter literalTypesAsObject to analyseLiteralTypes
- added parameter "--stateFilesPattern" for search pattern of state files (default:  ["/redux/state.ts", "/reducer/state.ts"])

## Version 0.2.26
- FIX: unittests and errors found by other automated tests <3

## Version 0.2.25
- FIX: literaltype updated (will now resolve null) => literalTypesAsObject
- removed typeAliases again - never happend to occur in current testsetup :)

## Version 0.2.24
- Change typeliteral to literaltype => literalTypesAsObject

## Version 0.2.23
- Added Parameter for mapping type literal to object: typeLiteralsAsObject: boolean;
- Added Parameter for mapping type alias to object: typeAliasesAsObject: boolean;

## Version 0.2.18-beta
- Adding automated tests

## Version 0.2.17
- Upgrade dependencies

## Version 0.2.16
- Upgrade dependencies
- Fixed readme

## Version 0.2.15
- Extended README
- Added action for github

## Version 0.2.14
- fixed clean script - i really should drink more coffee

## Version 0.2.13
- fixed clean script

## Version 0.2.12
- Fixed a behavior which lead to working, but ugly relative import paths
- Created some base ground for future unittesting (anyone into writing some tests for this lib?)
- Enhanced some unittests