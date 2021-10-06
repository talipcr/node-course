const app = require('./app.js');

const port = process.env.PORT;

app.route('/').get((req, res) => {
	res.send('Welcome to Task App!');
});

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
