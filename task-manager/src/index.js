const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.route('/').get((req, res) => {
	res.send('Welcome to Task App!');
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
