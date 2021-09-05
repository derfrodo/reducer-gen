#!/usr/bin/env node
import yargs = require("yargs");
import type { ArgsV } from "./interfaces/ArgsV";
import generate from "./index";
import "loglevel";
import { ArgsOptions } from "./args/ArgsOptions";
import log from "loglevel";

const argv: ArgsV = (yargs.options(ArgsOptions).argv as unknown) as ArgsV;
log.setDefaultLevel(argv.loglevel);
log.setLevel(argv.loglevel);

log.trace("Trace");
log.debug("Debug");
log.info("Info");
log.warn("Warn");
log.error("Error");

generate(argv);
