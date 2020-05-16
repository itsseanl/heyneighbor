export default function createComment(req, res) {
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

		const comment = {
			referenceID: data.id,
			user: data.username,
			imgURL: data.imgURL,
			date: datetime,
			comment: data.comment,
		};
		let createPost = await db
			.collection("comments")
			.insertOne(comment, function (err, resp) {
				console.log(resp);
				if (err) {
					res.status(200).json({ response: err });
				} else {
					res.status(200).json({ response: "comment created" });
				}
			});
		client.close();
	});
}
