export default function getPosts(req, res) {
	const MongoClient = require("mongodb").MongoClient;
	const uri = process.env.mongoconnect;
	const client = new MongoClient(uri, { useNewUrlParser: true });
	const assert = require("assert");

	client.connect(async function (error) {
		assert.ifError(error);
		const db = client.db("heyneighbor");
		let data = JSON.parse(req.body);
		// console.log(data);
		const username = { username: data.username };

		//check for username sent
		let userData = await db.collection("users").findOne(username);
		let lat = userData.lat;
		let lon = userData.long;
		// console.log("resp " + JSON.stringify(userData));
		// console.log(lat);
		// console.log(lon);

		//return only posts that are within selected radius based on user coordinates
		const nearSphere = {
			geo: {
				$nearSphere: {
					$geometry: {
						type: "Point",
						coordinates: [lat, lon],
					},
					$minDistance: 0,
					$maxDistance: data.radius * 1609.34,
				},
			},
		};
		const comQuery = {
			referenceID: {},
		};

		let posts = await db
			.collection("posts")
			.find(nearSphere)
			.sort({ _id: -1 })
			.limit(50)
			.toArray();

		client.close();

		res.status(200).json({ posts: posts });
	});
}
