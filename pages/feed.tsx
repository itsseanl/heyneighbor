import react, { useEffect, useState } from "react";
import { useFetchUser } from "../utils/users";
import Router from "next/router";

import Navigation from "../components/Navigation";

const Feed = () => {
	const { user, loading } = useFetchUser();
	const [posts, setPosts] = useState([]);
	const [radius, setRadius] = useState(0);
	const isClient = typeof document !== "undefined";

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
				setRadius(returned.user.radius);
			} else {
				console.log("defaulting to 5 miles");
				setRadius(5);
				return;
			}
		} catch (error) {
			//console.log(error);
			return error;
		}
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

	useEffect(() => {
		if (user) {
			getPosts(user.name);
		}
	}, [user]);

	useEffect(() => {
		if (user) {
			console.log(posts);
			getPosts(user.name);
		}
	}, [radius]);

	async function getPosts(user) {
		console.log("getposts radius: " + radius);
		const data = { username: user, radius: radius };
		const posts = await fetch("/api/getposts", {
			method: "POST",
			body: JSON.stringify(data),
		});
		const resp = await posts.json();
		console.log(resp);
		setPosts(resp.posts);
	}

	return (
		<>
			<h1>Feed</h1>
			<p>Welcome to your feed</p>
			<div className="posts">
				{posts.map((post) => {
					return (
						<div className="post">
							<h2>{post.title}</h2>
							<p>{post.body}</p>
							<p>{post.user}</p>
							<p>{post.date}</p>
						</div>
					);
				})}
			</div>
			<Navigation user={user} loading={loading} />
			<style jsx>{`
				.posts {
					display: flex;
					flex-direction: column;
					margin: 15px auto;
					padding: 15px;
					max-width: 900px;
				}
				.post {
					background: #fff;
					padding: 15px;
				}
			`}</style>
		</>
	);
};

export default Feed;
