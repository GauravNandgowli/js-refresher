hello(goodbye);

function hello(callback) {
	setTimeout(() => {
		console.log("Hello!!");
		callback();
	}, 3000);
}

function goodbye() {
	console.log("goodBye!");
}

fetch(`${countries_url}/${"iran"}`)
	.then((res) => res.json())
	.then((data) => console.log(data));
