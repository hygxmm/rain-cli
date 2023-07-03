#! /usr/bin/env node

const program = require("commander");

program
  .name("rain")
  .usage("<command> [options]")
  .version(require("../package.json").version);

program
  .command("create <project-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exist")
  .action((projectName, cmd) => {
    require("../lib/create.js")(projectName, cmd);
  });

program.parse(process.argv);
