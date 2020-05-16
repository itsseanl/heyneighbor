export default function createPost(req, res) {
	const MongoClient = require("mongodb").MongoClient;
	const uri = process.env.mongoconnect;
	const client = new MongoClient(uri, { useNewUrlParser: true });
	const assert = require("assert");

	client.connect(async function (error) {
		assert.ifError(error);
		const db = client.db("heyneighbor");
		let data = JSON.parse(req.body);
		console.log(data);
		const username = { username: data.username };

		//check for username sent
		let userData = await db.collection("users").findOne(username);
		let lat = userData.lat;
		let lon = userData.long;
		console.log("resp " + JSON.stringify(userData));
		console.log(lat);
		console.log(lon);
		let currentDate = new Date();
		var datetime =
			currentDate.getMonth() +
			1 +
			"/" +
			currentDate.getDate() +
			"/" +
			currentDate.getFullYear() +
			" @ " +
			currentDate.getHours() +
			":" +
			currentDate.getMinutes() +
			":" +
			currentDate.getSeconds();

		const post = {
			title: data.title,
			body: data.body,
			user: data.nickname,
			username: data.username,
			imgURL: data.imgURL,
			date: datetime,
			geo: {
				coordinates: [lat, lon],
				type: "Point",
			},
		};
		let createPost = await db
			.collection("posts")
			.insertOne(post, function (err, resp) {
				console.log(resp);
				if (err) {
					res.status(200).json({ response: err });
				} else {
					res.status(200).json({ response: "post created" });
				}
			});
		client.close();
	});
}
