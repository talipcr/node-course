const express = require('express');
const Task = require('../models/task');
const router = express.Router();

router.post('/tasks', async (req, res) => {
	const task = new Task(req.body);

	try {
		task.save();
		res.status(201).send(task);
	} catch (err) {
		res.status(400).send(err);
	}
});

router.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find();
		res.status(200).send(tasks);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
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

router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router;
