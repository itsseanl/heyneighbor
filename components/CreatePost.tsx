import react, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";

const CreatPost = ({ createPost, close, user }) => {
	// console.log(user + loading);

	const [title, setTitle] = useState(null);
	const [body, setBody] = useState(null);
	console.log(user);
	const useStyles = makeStyles((theme) => ({
		button: {
			margin: theme.spacing(1),
		},
	}));

	const classes = useStyles();

	return (
		<>
			<div
				className="modal"
				onClick={(e) => {
					close(false);
				}}
			>
				<form
					onClick={(e) => {
						e.stopPropagation();
						console.log("no");
					}}
				>
					<Grid container direction="column" style={{ width: "90%" }}>
						<Grid
							xs={12}
							container
							direction="row"
							alignItems="center"
							style={{ padding: 20 }}
						>
							<img src={user.picture} />
							<p>@{user.nickname}</p>
						</Grid>
						<Grid container direction="column">
							<TextField
								id="outlined-basic"
								label="Post Title"
								variant="outlined"
								onChange={(e) => setTitle(e.currentTarget.value)}
								required
							/>
							<TextField
								id="outlined-basic"
								label="Post Body"
								variant="outlined"
								multiline
								rowsMax={10}
								onChange={(e) => setBody(e.currentTarget.value)}
								required
							/>

							<Button
								variant="contained"
								color="primary"
								className={classes.button}
								endIcon={<SendIcon />}
								onClick={() => createPost(title, body)}
							>
								Post
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
			<style jsx>{`
				.modal {
					position: absolute;
					left: 0;
					top: 0;
					width: 100vw;
					height: 100vh;
					background: rgba(0, 0, 0, 0.3);
					z-index: 99;
				}
				form {
					background: #fff;
					z-index: 100;
				}
				.modal,
				form {
					display: flex;
					flex-direction: column;
					justify-content: Center;
					align-items: center;
				}
				form {
					width: 80vw;
					margin: 15px auto;
				}
				img {
					height: 50px;
					width: 50px;
					border-radius: 50%;
				}
			`}</style>
		</>
	);
};
export default CreatPost;
