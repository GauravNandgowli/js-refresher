const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const random_user_url = "https://randomuser.me/api/";
const countries_url = "https://restcountries.com/v3.1/name/";
const exchange_rate_url = `https://api.exchangeratesapi.io/v1/latest?access_key=${process.env.exchng_rate_api_key}`;

const consolidatedData = {
	userName: "",
	email: "",
	nationality: "",
	countryDetails: {
		officialName: "",
		capital: "",
		region: "",
		currency: "",
	},
	exchangeRate: "",
};

const printAll = () => {
	fetch(random_user_url)
		.then((res) => res.json())
		.then((data) => {
			const url = `${countries_url}${userDataProcess(data)}`;
			return url;
		})
		.then((url) => fetch(url))
		.then((res) => res.json())
		.then((data) => populate(data)) //does not return anything
		.then(() => fetch(exchange_rate_url)) //not depedent on prebious return
		.then((res) => res.json())
		.then((data) => {
			consolidatedData.exchangeRate =
				data.rates[consolidatedData.countryDetails.currency];
			console.log(consolidatedData);
		});
};
printAll();

const userDataProcess = (userData) => {
	data = userData.results[0];
	consolidatedData.userName = data.name.first + " " + data.name.last;
	consolidatedData.email = data.email;
	consolidatedData.nationality = data.location.country;
	return consolidatedData.nationality;
};

const populate = (countryData) => {
	consolidatedData.countryDetails.officialName = countryData[0].name.official;
	consolidatedData.countryDetails.currency = Object.keys(
		countryData[0].currencies
	)[0];
	consolidatedData.countryDetails.capital = countryData[0].capital[0];
	consolidatedData.countryDetails.region = countryData[0].region;
};
