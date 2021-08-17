const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ROUTES
app.use(userRouter);
app.use(taskRouter);

// RUN APP
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

const jwt = require('jsonwebtoken');

const myFunction = async () => {
	const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', {
		expiresIn: '1h',
	});

	console.log(token);

	jwt.verify(token, 'thisismynewcourse', (err, decoded) => {
		console.log(decoded);
	});
};

myFunction();
