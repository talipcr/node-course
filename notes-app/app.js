const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

yargs.version('1.1.0');

// Create add command

yargs.command({
	command: 'add',
	describe: 'Add a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string',
		},
		body: {
			describe: 'Note body',
			demandOption: true,
			type: 'string',
		},
	},
	handler: (argv) => {
		console.log('Adding a new note :');
		notes.addNote(argv.title, argv.body);
	},
});

// Create remove command

yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	handler: (argv) => {
		console.log('Removing a note');
	},
});

// Create list command

yargs.command({
	command: 'list',
	describe: 'List out all note',
	handler: (argv) => {
		console.log('Listing out all note');
	},
});

// Create read command

yargs.command({
	command: 'read',
	describe: 'Read a note',
	handler: (argv) => {
		console.log('Reading a note');
	},
});

// add, remove, read, list

yargs.parse();
