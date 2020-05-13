import react, { useEffect, useState } from "react";
import { useFetchUser } from "../utils/users";

import Navigation from "../components/Navigation";

const Feed = () => {
	const { user, loading } = useFetchUser();
	const [posts, setPosts] = useState([]);
	//5 miles
	const radius = 5;

	useEffect(() => {
		if (user) {
			getPosts(user.name);
		}
	}, [user]);

	useEffect(() => {
		console.log(posts);
	}, [posts]);

	async function getPosts(user) {
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
			{posts.map((post) => {
				return (
					<div className="post">
						<h1>{post.title}</h1>
					</div>
				);
			})}
			<Navigation user={user} loading={loading} />
		</>
	);
};
export default Feed;
