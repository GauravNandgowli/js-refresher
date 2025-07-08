// const fetch = require("node-fetch"); // For Node.js < v18

const random_user_url = "https://randomuser.me/api/";
const countries_url = "https://restcountries.com/v3.1/name/";
const exchange_rate_url = `https://api.exchangerate.host/latest`;

function fetchWithCallback(url, callback) {
	fetch(url)
		.then((res) => res.json())
		.then((data) => callback(null, data))
		.catch((err) => callback(err, null));
}

function printDetails() {
	fetchWithCallback(random_user_url, (err1, userData) => {
		if (err1) return console.error("Error fetching user:", err1);
		const user = userData.results[0];
		const name = `${user.name.first} ${user.name.last}`;
		const email = user.email;
		const nationality = user.location.country;
		console.log("User:", name, "| Email:", email, "| Country:", nationality);
		fetchWithCallback(countries_url + nationality, (err2, countryData) => {
			if (err2) return console.error("Error fetching country:", err2);
			const currencyCode = Object.keys(countryData[0].currencies)[0];
			console.log("Currency:", currencyCode);
			fetchWithCallback(exchange_rate_url + `?base=USD`, (err3, rateData) => {
				if (err3) return console.error("Error fetching rates:", err3);
				const rate = rateData.rates[currencyCode];
				console.log(`Exchange Rate USD -> ${currencyCode}:`, rate);
				// Final level of callback hell - get timezone
				const timezoneApi =
					"http://worldtimeapi.org/api/timezone/Europe/London"; // hardcoded for demo
				fetchWithCallback(timezoneApi, (err4, timeData) => {
					if (err4) return console.error("Error fetching time:", err4);
					console.log("Current Time:", timeData.datetime);
				});
			});
		});
	});
}

printDetails();
