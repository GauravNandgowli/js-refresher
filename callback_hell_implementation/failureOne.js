const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const longitude = ``;
const latitude = ``;
const random_user_url = "https://randomuser.me/api/";
const countries_url = "https://restcountries.com/v3.1/name/";
const exchange_rate_url = `https://api.exchangeratesapi.io/v1/latest? access_key = ${process.env.exchng_rate_api_key}`;
const timezone_url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.timezone_api_key}&format=josn&by=position&lat=${latitude}&lng=${longitude}`;

const details = {};

// const printDetails = ()=>{
// //const user = fetch(random_user_url).then(response => response.json()).then(data=>data) // returns promise , so we have to use callback
// // const user = ()=>{fetch(random_user_url).then(response => response.json()).then(data=>data)}
// const user =  fetchDetails( random_user_url )
// // console.log(user);
// }
const user = fetchDetails(random_user_url, function (data) {
	console.log(data); //data has to be consumed in the callback for retention else assign the data to global variable
	return data;
});

console.log(user); //will always print undefined

function fetchDetails(url, callback) {
	fetch(url)
		.then((response) => response.json()) // this is like waiting
		.then((data) => {
			callback(data);
		});
}
// fetchDetails(random_user_url)
// printDetails()
