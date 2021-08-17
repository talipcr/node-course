require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('611a6288d5e0d72fbdfbfa00', { age: 1 })
// 	.then((user) => {
// 		console.log(user);
// 		return User.countDocuments({ age: 1 });
// 	})
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

const updateAgeAndCount = async (id, age) => {
	const user = await User.findByIdAndUpdate(id, { age });
	const count = await User.countDocuments({ age });
	return { user, count };
};

updateAgeAndCount('611a6288d5e0d72fbdfbfa00', 2)
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.log(err);
	});
