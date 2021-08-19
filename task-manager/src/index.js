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

// app.use((req, res, next) => {
// 	res.status(503).send('Service Unavailable');
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// RUN APP
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
// 	// const task = await Task.findById('611e5b49c1130c327aa4e7d7');
// 	// await task.populate('owner').execPopulate();
// 	// console.log(task.owner);

// 	const user = await User.findById('611e5a1bf7048331bb6ee40a');
// 	await user.populate('tasks').execPopulate();
// 	console.log(user.tasks);
// };

// main();
