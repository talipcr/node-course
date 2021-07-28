const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
	return 'Your notes...';
};

const addNote = (title, body) => {
	const notes = loadNotes();

	const duplicatesNote = notes.find((note) => note.title === title);

	if (!duplicatesNote) {
		notes.push({
			title: title,
			body: body,
		});
		saveNotes(notes);
		console.log(chalk.green.inverse('New note added!'));
	} else {
		console.log(chalk.red.inverse('Note already exists'));
	}
};

const removeNote = (title) => {
	const notes = loadNotes();

	const notesToKeep = notes.filter((note) => note.title !== title);

	if (notes.length > notesToKeep.length) {
		saveNotes(notesToKeep);
		console.log(chalk.green.inverse('Note as already removed'));
	} else {
		console.log(chalk.red.inverse('Note not found'));
	}
};

const listNotes = () => {
	const notes = loadNotes();
	console.log(chalk.inverse('Notes:'));
	console.log(notes.map((note) => `${note.title} - ${note.body}`).join('\n'));
};

const readNote = (title) => {
	const notes = loadNotes();
	const note = notes.find((note) => note.title === title);
	if (note) {
		console.log(chalk.inverse(`${note.title} - ${note.body}`));
	} else {
		console.log(chalk.red.inverse('Note not found'));
	}
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (e) {
		return [];
	}
};

module.exports = { getNotes, addNote, removeNote, listNotes, readNote };
