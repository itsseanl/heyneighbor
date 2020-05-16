import react, { useEffect, useState } from "react";
import { useFetchUser } from "../utils/users";
import Router from "next/router";
import Grid from "@material-ui/core/Grid";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import AddIcon from "@material-ui/icons/Add";

import Navigation from "../components/Navigation";
import CreatePost from "../components/CreatePost";
import CreateComment from "../components/CreateComment";
import Comment from "../components/Comment";
const Feed = () => {
	const { user, loading } = useFetchUser();
	const [posts, setPosts] = useState([]);
	const [coms, setComs] = useState([]);
	const [radius, setRadius] = useState(0);
	const [displayModal, setDisplayModal] = useState(false);
	const isClient = typeof document !== "undefined";

	async function checkUser(data) {
		//check if user exists in mongodb
		// console.log(data);
		try {
			const res = await fetch("/api/user", {
				method: "POST",
				body: JSON.stringify(data),
			});
			let returned = await res.json();
			// console.log("returned " + returned.response);

			// console.log("returned " + returned.user.radius);
			if (returned.user.radius) {
				setRadius(returned.user.radius);
			} else {
				// console.log("defaulting to 5 miles");
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
			// console.log(posts);
			getPosts(user.name);
		}
	}, [radius]);

	async function getPosts(user) {
		// console.log("getposts radius: " + radius);
		const data = { username: user, radius: radius };
		const posts = await fetch("/api/getposts", {
			method: "POST",
			body: JSON.stringify(data),
		});
		const resp = await posts.json();
		//console.log("posts: " + resp.posts);
		// console.log("coms: " + JSON.stringify(resp));
		setComs(resp.coms);
		setPosts(resp.posts);
	}

	const createPost = async (title, body) => {
		let data;
		if (title && body) {
			setDisplayModal(false);
			data = {
				title: title,
				body: body,
				nickname: user.nickname,
				username: user.name,
				imgURL: user.picture,
			};
			// console.log("title recieved: " + title + " body recieved: " + body);
			const create = await fetch("/api/createpost", {
				method: "POST",
				body: JSON.stringify(data),
			});
			const resp = await create.json();
			// console.log(resp);
			getPosts(user.name);
		}
	};

	const createComment = async (comment, id) => {
		// console.log("createcomment: " + comment + " on post: " + id);
		const data = {
			username: user.nickname,
			imgURL: user.picture,
			comment: comment,
			id: id,
		};
		const create = await fetch("/api/createcomment", {
			method: "POST",
			body: JSON.stringify(data),
		});
		const resp = await create.json();
		// console.log(resp);
		getPosts(user.name);
	};
	// console.log(displayModal);
	return (
		<>
			<div className="header">
				<div className="left">
					<h1>heyNeighbor</h1>
					<p>Welcome to your feed</p>
				</div>
				<div className="right">{/* <img src="./homey.svg" /> */}</div>
			</div>

			<div className="posts">
				<div className="post new-post">
					<div className="post-body">
						<Grid
							container
							direction="row"
							alignItems="center"
							justify="center"
						>
							<Grid item>
								<div onClick={() => setDisplayModal(true)}>
									<AddIcon />
								</div>
							</Grid>
						</Grid>
					</div>
				</div>
				{posts && coms
					? posts.map((post) => {
							return (
								<>
									<div className="post">
										<div className="post-body">
											<h2>{post.title}</h2>
											<p>{post.body}</p>
										</div>
										<div className="post-footer">
											<div className="left">
												<img src={post.imgURL} />
											</div>
											<div className="right">
												<p>@{post.user}</p>

												<p>{post.date}</p>
											</div>
										</div>
									</div>
									<Comment postID={post._id} coms={coms} />
									<CreateComment
										createComment={createComment}
										postID={post._id}
									/>
								</>
							);
					  })
					: null}
			</div>
			{displayModal && user ? (
				<CreatePost
					createPost={createPost}
					close={setDisplayModal}
					user={user}
				/>
			) : null}
			<Navigation user={user} loading={loading} />
			<style jsx>{`
				.header {
					background: #fff;
					// background: rgb(32, 136, 194);
					// background: linear-gradient(
					// 	160deg,
					// 	rgba(255, 255, 255, 1) 46%,
					// 	rgba(32, 136, 194, 1) 44%
					// );
					box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.3);
					top: 0;
					padding: 15px;
					display: flex;
					flex-wrap: nowrap;
					border-bottom: 2px solid #fff;
				}
				.header h1 {
					margin-bottom: 0;
					font-size: 2em;
				}
				.header > .left,
				.header > .right {
					width: 50%;
				}
				.header > .right {
					display: flex;
					justify-content: center;
					align-items: center;
					background: #rgba(0, 0, 0, 0);
				}

				.posts {
					display: flex;
					flex-direction: column;
					margin: 15px auto;
					padding: 15px;
					max-width: 900px;
					max-height: 80vh;
					overflow-y: scroll;
				}
				.post {
					background: #fff;
					margin: 15px auto;
					margin-bottom: 0;
					width: 100%;
					box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.1);
				}
				.new-post > :global(svg) {
					margin: auto;
					text-align: center;
				}
				.post-footer {
					display: flex;
					flex-wrap: nowrap;
					background: #d8d8d8;
				}
				.left,
				.right {
					display: flex;
					flex-direction: column;

					font-size: 14px;
					font-style: italic;
					color: #333;
					font-weight: 400;
				}
				.right p {
					margin: 2px;
				}
				.post-footer > .left > img {
					height: 50px;
					width: 50px;
				}
				.right img {
					height: 70%;
					width: auto;
				}
				.post-body,
				.post-footer {
					padding: 15px;
				}
			`}</style>
		</>
	);
};

export default Feed;
