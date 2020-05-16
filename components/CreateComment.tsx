import react, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";

const CreateComment = ({ createComment, postID }) => {
	const [comment, setComment] = useState(null);
	const useStyles = makeStyles((theme) => ({
		button: {
			margin: theme.spacing(1),
		},
	}));

	const classes = useStyles();

	return (
		<>
			<div className="add-comment">
				<TextField
					id="outlined-basic"
					label="your comment"
					variant="filled"
					multiline
					rowsMax={10}
					style={{ width: "70%", height: "50px", borderRadius: 0 }}
					onChange={(e) => setComment(e.currentTarget.value)}
					required
				/>

				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					endIcon={<SendIcon />}
					style={{ height: "50px" }}
					onClick={() => createComment(comment, postID)}
				>
					Post
				</Button>
			</div>
			<style jsx>{`
				.add-comment {
					background: #ebebeb;
					padding: 15px;
					box-shadow: inset 0px 0px 8px 2px rgba(0, 0, 0, 0.3);
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
				}
			`}</style>
		</>
	);
};
export default CreateComment;
