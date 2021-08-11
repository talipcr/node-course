const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/task-manager-api', {
	useNewUrlParser: true,
	useCreateIndex: true,
});

const Task = mongoose.model('Task', {
	description: {
		type: String,
		required: true,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});
