const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
// 	console.log(req.method, req.path);

// 	if (req.method === 'GET') {
// 		res.send('GET request are disabled');
// 	} else {
// 		next();
// 	}
// });

app.use((req, res, next) => {
	res.status(503).send('Service Unavailable');
});

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
	const token = jwt.sign({ _id: 'abc123' }, 'secret', {
		expiresIn: '1h',
	});

	console.log(token);

	jwt.verify(token, 'secret', (err, decoded) => {
		console.log(decoded);
	});
};

myFunction();
