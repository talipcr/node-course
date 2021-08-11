const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
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
});
module.exports = User;
