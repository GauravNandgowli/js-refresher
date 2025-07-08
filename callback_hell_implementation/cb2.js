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

function getDataFromApi(url, cb) {
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			cb(data);
		});
}

// getDataFromApi(random_user_url, (data) => {
// 	const url = `${countries_url}${userDataProcess(data)}`;
// 	getDataFromApi(url, (countryData) => {
// 		populate(countryData);
// 		getDataFromApi(exchange_rate_url, (data) => {
// 			consolidatedData.exchangeRate =
// 				data.rates[consolidatedData.countryDetails.currency];
// 			console.log(consolidatedData);
// 		});
// 	});
// });

const cbOne = (data) => {
	const url = `${countries_url}${userDataProcess(data)}`;
	getDataFromApi(url, cbTwo);
};

const cbTwo = (countryData) => {
	populate(countryData);
	getDataFromApi(exchange_rate_url, cbThree);
};

const cbThree = (data) => {
	consolidatedData.exchangeRate =
		data.rates[consolidatedData.countryDetails.currency];
	console.log(consolidatedData);
};

getDataFromApi(random_user_url, cbOne);

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

//you cannot use global variable to store data , even if you populate it in last callback
//to use the data obtained from api , you have to call another callback function which concerns itself with complete data obtained after making multiple api calls.
//other strategies are , to store the data in json file , or database.
//in this callback hell , we can flaten the  code for more readability but  callbacks persists , so this forms a tight knt chain of data flow
