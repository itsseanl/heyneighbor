import { MongoClient } from "mongodb";

export default async function user(req, res) {
	const MongoClient = require("mongodb").MongoClient;
	const uri = process.env.mongoconnect;
	const client = new MongoClient(uri, { useNewUrlParser: true });
	const assert = require("assert");

	client.connect(function (error) {
		assert.ifError(error);
		const db = client.db("heyneighbor");
		let data = JSON.parse(req.body);
		const username = { username: data.username };
		const update = { $set: { radius: data.radius } };
		//check for username sent
		db.collection("users").updateOne(username, update, function (err, resp) {
			if (err) {
				res.status(200).json({ response: err });
			}
			res.status(200).json({ response: "updated radius" });
			client.close();
		});
	});
}
