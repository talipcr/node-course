const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://localhost:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
	if (err) {
		console.log('Error connecting to database: ' + err);
	}
	console.log('Connected to database: ' + connectionURL);
	const db = client.db(databaseName);

	// db.collection('users').insertOne(
	// 	{
	// 		username: 'test',
	// 		password: 'test',
	// 		email: 'test',
	// 	},
	// 	(error, result) => {
	// 		if (error) {
	// 			console.log('Error inserting document into collection: ' + error);
	// 		}

	// 		console.log(result);
	// 	}
	// );

	// db.collection('users').insertMany(
	// 	[{ name: 'test1' }, { name: 'test2' }],
	// 	(error, result) => {
	// 		if (error) {
	// 			console.log('Error inserting document into collection: ' + error);
	// 		}

	// 		console.log(result);
	// 	}
	// );

	db.collection('tasks').insertMany(
		[
			{ description: 'test1', completed: true },
			{ description: 'test2', completed: true },
			{ description: 'test3', completed: false },
		],
		(error, result) => {
			if (error) {
				console.log('Error inserting document into collection: ' + error);
			}

			console.log(result);
		}
	);
});
