#!/usr/bin/env node
import yargs = require("yargs");
import "loglevel";
import log from "loglevel";
import { ArgsOptions } from "./args/ArgsOptions";
import generate from "./index";
import type { ArgsV } from "./interfaces/ArgsV";

const argv: ArgsV = yargs.options(ArgsOptions).argv as ArgsV;
log.setDefaultLevel(argv.loglevel);
log.setLevel(argv.loglevel);

log.trace("Trace");
log.debug("Debug");
log.info("Info");
log.warn("Warn");
log.error("Error");

generate(argv);
