const asyncFxn = (data, callBack) => {
	setTimeout(() => callBack(data), 3000);
};

asyncFxn("Taking the orders", (data) => {
	console.log(data);
	asyncFxn("Preparing the pizza", (data) => {
		console.log(data);
		asyncFxn("sering the pizza", (data) => {
			console.log(data);
			asyncFxn("collecting bills", (data) => {
				console.log(data);
				asyncFxn("Transaction complete", (data) => {
					console.log(data);
				});
			});
		});
	});
});
