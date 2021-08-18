const express = require('express');
const User = require('../models/user');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (err) {
		res.status(400).send(err);
	}
});

router.get('/users/me', auth, async (req, res) => {
	res.send(req.user);
});

router.get('/users/:id', async (req, res) => {
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

router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateAuthToken();

		return res.status(201).send({ user, token });
	} catch (err) {
		res.status(400).send(err);
	}
});

router.patch('/users/:id', async (req, res) => {
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
		const user = await User.findByIdAndUpdate(id);
		updates.forEach((update) => (user[update] = req.body[update]));
		await user.save();

		if (!user) {
			return res.status(404).send('User not found');
		}

		res.status(200).send(user);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.delete('/users/:id', async (req, res) => {
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

module.exports = router;