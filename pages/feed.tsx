import react, { useEffect, useState } from "react";
import { useFetchUser } from "../utils/users";

const Feed = () => {
	const { user, loading } = useFetchUser();

	const radius = 5;

	useEffect(() => {
		if (user) {
			console.log(user.name);
		}
	}, [user]);

	return (
		<>
			<h1>Feed</h1>
			<p>Welcome to your feed</p>
		</>
	);
};
export default Feed;
