const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
	if (err) {
		console.log('Error connecting to database: ' + err);
	}
	const db = client.db(databaseName);

	console.log(`Connected to database ${databaseName}`);

	const User = db.collection('users');
	const Task = db.collection('tasks');

	// User.deleteMany({ username: 'test' })
	// 	.then(() => {
	// 		console.log('Users deleted');
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});

	Task.deleteOne({ description: 'test1' })
		.then(() => {
			console.log('Task deleted');
		})
		.catch((err) => {
			console.log(err);
		});

	// User.updateOne(
	// 	{ _id: new ObjectId('61128108c8e7277778de2d68') },
	// 	{
	// 		$inc: {
	// 			age: 1,
	// 		},
	// 	}
	// )
	// 	.then(() => {
	// 		console.log('User updated');
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});

	// Task.updateMany(
	// 	{},
	// 	{
	// 		$set: {
	// 			completed: true,
	// 		},
	// 	}
	// )
	// 	.then(() => {
	// 		console.log('Task updated');
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
});
