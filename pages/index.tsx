import react, { useState, useEffect } from "react";
import Head from "next/head";
import { useFetchUser } from "../utils/users";
import BackSplash from "../components/BackSplash";
import Navigation from "../components/Navigation";

export default function Home() {
	const { user, loading } = useFetchUser();
	const [theUser, setTheUser] = useState(user);
	const [userLoading, setUserLoading] = useState(loading);
	console.log(user);
	return (
		<>
			<BackSplash />
			<div className="home">
				<div className="logo">
					<img src="./homey.svg" />
					<h1>heyNeighbor</h1>
				</div>
				<Navigation user={user} loading={loading} />
			</div>
			<style jsx>{`
				.home {
					position: relative;
					z-index: 2;
					display: flex;
					flex-direction: Column;
					align-items: center;
					color: #fffff0;
				}
				.logo {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
				img {
					max-height: 700px;
				}
				h1 {
					font-size: 4em;
					margin-top: 0;
				}
			`}</style>
		</>
	);
}

// Video by Kelly Lacy from Pexels
