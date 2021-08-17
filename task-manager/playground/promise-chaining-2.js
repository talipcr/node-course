require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('6113cc5a9be5a6817939ff39')
	.then((task) => {
		console.log(task);
		return Task.countDocuments({});
	})
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.log(err);
	});

const deleteTaskAndCount = async (id) => {
	const task = await Task.findByIdAndDelete(id);
	const count = await Task.countDocuments({});
	return { task, count };
};

deleteTaskAndCount('611a27f68433792303a46c9e')
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.log(err);
	});
