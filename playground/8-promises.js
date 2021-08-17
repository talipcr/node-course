const add = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(a + b);
		}, 2000);
	});
};

// add(1, 2)
// 	.then((value) => {
// 		console.log(value);

// 		add(value, 5)
// 			.then((sum2) => {
// 				console.log(sum2);
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

add(1, 1)
	.then((sum) => {
		console.log(sum);
		return add(sum, 5);
	})
	.then((sum2) => {
		console.log(sum2);
	})
	.catch((error) => {
		console.log(error);
	});
