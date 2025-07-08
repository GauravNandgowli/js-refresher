const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const longitude = ``;
const latitude = ``;
const random_user_url = "https://randomuser.me/api/";
const countries_url = "https://restcountries.com/v3.1/name/";
const exchange_rate_url = `https://api.exchangeratesapi.io/v1/latest?access_key=${process.env.exchng_rate_api_key}`;
const timezone_url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.timezone_api_key}&format=josn&by=position&lat=${latitude}&lng=${longitude}`;

const printDetails = () => {
	const fetchDetails = (url, cb) => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				data = cb(data);
				const url = `${countries_url}${data.nationality}`;
				fetch(url)
					.then((res) => res.json())
					.then((data) => {
						const currency = Object.keys(data[0].currencies)[0];
						const ex_url = `${exchange_rate_url}`;
						fetch(ex_url)
							.then((res) => res.json())
							.then((data) => console.log(data.rates[currency]));
					});
			});
	};

	fetchDetails(random_user_url, (data) => {
		data = data.results[0];
		const name = data.name.first + " " + data.name.last;
		const email = data.email;
		const nationality = data.location.country;
		const coordinates = data.location.coordinates;
		data = {};
		data = {
			name,
			email,
			nationality,
			coordinates,
		};
		return data;
	});
};

printDetails();
