import Head from "next/head";
import Navigation from "../components/Navigation";
import { useFetchUser } from "../utils/users";
import Router from "next/router";
import { useState, useEffect } from "react";
import { getLocationOrigin } from "next/dist/next-server/lib/utils";

import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import HomeIcon from "@material-ui/icons/Home";
import Public from "@material-ui/icons/Public";
const Dashboard = () => {
	const { user, loading } = useFetchUser();
	const isLoading = useState(loading);
	const isClient = typeof document !== "undefined";
	const [value, setValue] = useState(0);
	const [isRadiusSet, setIsRadiusSet] = useState(false);
	async function checkUser(data) {
		//check if user exists in mongodb

		console.log(data);
		try {
			const res = await fetch("/api/user", {
				method: "POST",
				body: JSON.stringify(data),
			});
			let returned = await res.json();
			console.log("returned " + returned.response);

			console.log("returned " + returned.user.radius);
			if (returned.user.radius) {
				setValue(returned.user.radius);
				setIsRadiusSet(true);
			}
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
	//set lat/long
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
			checkUser({ username: user.name });
		}
	}, [user]);

	//redirect if not logged in
	if (!user && !loading) {
		if (isClient) {
			Router.replace("/");
		}
	}
	//set slider value
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const updatedRad = async () => {
		console.log("onchangecommited");
		const data = { username: user.name, radius: value };
		const updateRad = await fetch("/api/userRadius", {
			method: "POST",
			body: JSON.stringify(data),
		});
		let returned = await updateRad.json();
		console.log(returned.response);
	};
	return (
		<>
			<div className="wrapper">
				<h1>Settings:</h1>
				{isRadiusSet ? (
					<div className="setting">
						<p>Set Radius</p>
						<Grid container spacing={2}>
							<Grid item>
								<HomeIcon />
							</Grid>
							<Grid item xs>
								<Slider
									value={value}
									onChange={handleChange}
									onChangeCommitted={updatedRad}
									min={1}
									max={100}
									aria-labelledby="continuous-slider"
								/>
							</Grid>
							<Grid item>
								<Public />
							</Grid>
						</Grid>
						<p>{value} Miles</p>
					</div>
				) : (
					<div className="skeleton-setting">
						<div className="skeleton-text"></div>
						<div className="skeleton-section"></div>
						<div className="skeleton-text"></div>
					</div>
				)}
			</div>
			<Navigation user={user} loading={loading} />
			<style jsx>{`
				.wrapper {
					background: #fff;
					padding: 15px;
					margin: 15px auto;
					max-width: 900px;
				}
				.skeleton-text {
					width: 300px;
					height: 25px;
					background: #ebebeb;
					margin: 5px;
				}
				.skeleton-section {
					width: 100%;
					height: 50px;
					background: #ebebeb;
					margin: 5px;
				}
				.skeleton-setting {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: flex-start;
				}
			`}</style>
		</>
	);
};
export default Dashboard;
