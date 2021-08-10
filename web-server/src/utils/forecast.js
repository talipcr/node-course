const request = require('request');

const forecast = (lat, lon, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=6872f3b3abd54070296d31f8b145a211&query=${lat},${lon}&units=m`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.error) {
			callback('Unable to find location', undefined);
		} else {
			const data = body.current;

			console.log(body);
			callback(
				undefined,
				`${data.weather_descriptions}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degress out. The  humidity is ${data.humidity}%.`
			);
		}
	});
};

module.exports = forecast;
