const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if (!address) {
	console.log('Please provide an address');
	process.exit(1);
}

geocode(address, (error, { latitude, longitude, location }) => {
	if (error) {
		return console.log('Error: ', error);
	}

	forecast(latitude, longitude, (error, forecastData) => {
		if (error) {
			return console.log('Error: ', error);
		}

		console.log(location, forecastData);
	});
});
