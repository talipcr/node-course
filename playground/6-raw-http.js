const http = require('http');

const url =
	'http://api.weatherstack.com/current?access_key=6872f3b3abd54070296d31f8b145a211&query=40,-75&units=m';

const request = http.request(url, (res) => {
	let data = '';
	res.on('data', (chunk) => {
		console.log(chunk.toString());
		data += chunk.toString();
	});
	res.on('end', () => {
		console.log('end');
		const body = JSON.parse(data);
		console.log(body);
	});
});

request.on('error', (e) => {
	console.log(e);
});

request.end();
