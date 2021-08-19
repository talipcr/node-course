const express = require('express');
const Task = require('../models/task');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/tasks', auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id,
	});

	try {
		await task.save();
		res.status(201).send(task);
	} catch (err) {
		res.status(400).send(err);
	}
});

router.get('/tasks', auth, async (req, res) => {
	try {
		await req.user.populate('tasks').execPopulate();
		res.status(200).send(req.user.tasks);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get('/tasks/:id', auth, async (req, res) => {
	try {
		const task = await Task.findOne({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!task) {
			return res.status(404).send('Task not found');
		}
		res.status(200).send(task);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.patch('/tasks/:id', auth, async (req, res) => {
	const allowedUpdates = ['description', 'completed'];
	const updates = Object.keys(req.body);
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send('Invalid update operation');
	}

	try {
		const task = await Task.findOne({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!task) {
			return res.status(404).send('Task not found');
		}

		updates.forEach((update) => (task[update] = req.body[update]));
		await task.save();
		res.status(200).send(task);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.delete('/tasks/:id', auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!task) {
			return res.status(404).send('Task not found');
		}

		res.status(200).send('Task deleted');
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
