const chalk = require('chalk');

const getNotes = require('./notes.js');

const result = getNotes();

console.log(chalk.yellow.bold(result));
