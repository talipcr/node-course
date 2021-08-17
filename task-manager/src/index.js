const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// USER ROUTES

app.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		res.status(201).send(user);
	} catch (err) {
		res.status(400).send(err);
	}
});

app.get('/users', async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).send(users);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.get('/users/:id', async (req, res) => {
	const id = req.params.id;

	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).send('User not found');
		}
		res.status(200).send(user);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.patch('/users/:id', async (req, res) => {
	const id = req.params.id;

	const allowedUpdates = ['name', 'email', 'password', 'age'];
	const updates = Object.keys(req.body);
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send('Invalid update operation');
	}

	try {
		const user = await User.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!user) {
			return res.status(404).send('User not found');
		}
		res.status(200).send(user);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.delete('/users/:id', async (req, res) => {
	const id = req.params.id;

	try {
		const user = await User.findByIdAndDelete(id);
		if (!user) {
			return res.status(404).send('User not found');
		}
		res.status(200).send('User deleted');
	} catch (err) {
		res.status(500).send(err);
	}
});

// TASK ROUTES

app.post('/tasks', async (req, res) => {
	const task = new Task(req.body);

	try {
		task.save();
		res.status(201).send(task);
	} catch (err) {
		res.status(400).send(err);
	}
});

app.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find();
		res.status(200).send(tasks);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.get('/tasks/:id', async (req, res) => {
	const id = req.params.id;

	try {
		const task = await Task.findById(id);
		if (!task) {
			return res.status(404).send('Task not found');
		}
		res.status(200).send(task);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.patch('/tasks/:id', async (req, res) => {
	const id = req.params.id;

	const allowedUpdates = ['description', 'completed'];
	const updates = Object.keys(req.body);
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send('Invalid update operation');
	}

	try {
		const task = await Task.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!task) {
			return res.status(404).send('Task not found');
		}
		res.status(200).send(task);
	} catch (err) {
		res.status(500).send(err);
	}
});

app.delete('/tasks/:id', async (req, res) => {
	const id = req.params.id;

	try {
		const task = await Task.findByIdAndDelete(id);
		if (!task) {
			return res.status(404).send('Task not found');
		}
		res.status(200).send('Task deleted');
	} catch (err) {
		res.status(500).send(err);
	}
});

// RUN APP

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
