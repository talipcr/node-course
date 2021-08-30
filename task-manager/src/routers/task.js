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

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
	const match = req.query.completed
		? { completed: req.query.completed === 'true' }
		: {};
	const limit = parseInt(req.query.limit);
	const skip = parseInt(req.query.skip);
	const sort = {};

	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(':');
		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
	}

	try {
		await req.user
			.populate({
				path: 'tasks',
				match: match,
				options: {
					limit: limit,
					skip: skip,
				},
				sort: sort,
			})
			.execPopulate();
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
