require("dotenv").config();

module.exports = {
	env: {
		domain: process.env.domain,
		clientId: process.env.clientId,
		clientSecret: process.env.clientSecret,
		redirectUri: process.env.redirectUri,
		postLogoutRedirectUri: process.env.postLogoutRedirectUri,
		cookieSecret: process.env.cookieSecret,
		geolocationAPI: process.env.geolocationAPI,
		mongoconnect: process.env.mongoconnect,
	},
};
