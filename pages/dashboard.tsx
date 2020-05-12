import Head from "next/head";
import Navigation from "../components/Navigation";
import { useFetchUser } from "../utils/users";
import Router from "next/router";
import { useState, useEffect } from "react";
import { getLocationOrigin } from "next/dist/next-server/lib/utils";

const Dashboard = () => {
	const { user, loading } = useFetchUser();
	const isLoading = useState(loading);
	const isClient = typeof document !== "undefined";

	async function checkUser(data) {
		//check if user exists in mongodb
		try {
			const res = await fetch("/api/user", {
				method: "POST",
				body: JSON.stringify(data),
			});
			let returned = await res.json();
			//console.log("returned " + returned.response);
			if (returned.response == "no location") {
				getUserLocation();
			} else {
				return;
			}
		} catch (error) {
			//console.log(error);
			return error;
		}
	}
	function getUserLocation() {
		if (window.navigator.geolocation) {
			//	console.log("available");
			navigator.geolocation.getCurrentPosition(success, error);
		} else {
			//	console.log("not available");
		}
	}
	function success(position) {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		const username = user.name;
		const data = { username, latitude, longitude };
		checkUser(data);
		// alert("latitude :" + latitude + " longitude " + longitude);
	}

	function error() {
		alert(error);
	}

	useEffect(() => {
		if (user) {
			checkUser(user.name);
		}
	}, [user]);
	if (!user && !loading) {
		if (isClient) {
			Router.replace("/");
		}
	}
	return (
		<>
			<h1>Welcome to dashboard</h1>
			<Navigation user={user} loading={loading} />
		</>
	);
};
export default Dashboard;
