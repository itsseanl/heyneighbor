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
		console.log("data: " + data);
		const username = { username: data.username };
		let update;

		//if lat/long is sent, create update query
		if (data.latitude) {
			update = { $set: { lat: data.latitude, long: data.longitude } };
			//	console.log(update);
		}

		// username = { username: username };
		//console.log(username);

		//check for username sent
		db.collection("users").findOne(username, function (err, resp) {
			if (err) {
				res.status(200).json({ response: err });
			}
			//	console.log(resp);
			//if no response, user does not exist. Create user
			if (resp == null) {
				db.collection("users").insertOne(username, function (err, resp) {
					if (err) {
						res.status(200).json({ response: err });
					}
				});
				//if user exists but has not location, update user
			} else if (resp.lat == null && update) {
				db.collection("users").updateOne(username, update, function (
					err,
					resp
				) {
					if (err) {
						res.status(200).json({ response: err });
					}
					res.status(200).json({ response: "updated location" });
				});
				//if user exists, but has no location, respond with no location
			} else if (resp.lat == null && update == null) {
				res.status(200).json({ response: "no location", user: resp });
				//user has location, skip geolocation check
			} else {
				res.status(200).json({ response: "has location", user: resp });
			}
			//respond back with user info
			// res.status(200).json({ resp });

			client.close();
		});
	});
}
