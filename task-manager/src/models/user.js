const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is wrong');
			}
		},
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 7,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password cannot contains "password"');
			}
		},
	},
	age: {
		type: Number,
		required: true,
		default: 18,
		validate(value) {
			if (value < 18) {
				throw new Error('You must be at least 18 years old.');
			}
		},
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner',
});

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error('User not found');
	}

	const isMatch = bcrypt.compareSync(password, user.password);
	if (!isMatch) {
		throw new Error('Password is wrong');
	}

	return user;
};

userSchema.methods.generateAuthToken = async function () {
	const user = this;

	const token = jwt.sign(
		{
			_id: user._id.toString(),
		},
		'secret'
	);

	user.tokens = user.tokens.concat({ token });
	await user.save();

	return token;
};

userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

userSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
