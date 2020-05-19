import react, { useState, useEffect } from "react";

const Comment = ({ postID, coms }) => {
	const [comment, setComment] = useState(null);

	return (
		<>
			{coms.map((com) => {
				if (com.referenceID == postID) {
					console.log(com);
					return (
						<div className="comment">
							<div className="body">
								<p>{com.comment}</p>
							</div>
							<div className="author">
								<img src={com.imgURL} />
								<p>@{com.user}</p>
								<p>Posted: {com.date}</p>
							</div>
						</div>
					);
				}
			})}
			<style jsx>{`
				.comment {
					background: #ebebeb;
					padding: 15px;
					display: flex;
					flex-direction: column;
					align-items: center;
					border-bottom: 1px solid rgba(0, 0, 0, 0.2);
					height: auto;
					min-height: fit-content;
				}
				.body {
					width: 100%;
				}
				.author {
					display: flex;
					flex-wrap: nowrap;
					align-items: center;
					flex: 1 0 auto;
					font-size: 12px;
					background: #d8d8d8;
					width: 100%;
				}
				.author > * {
					padding: 5px;
				}

				img {
					height: 25px;
					width: 25px;
				}
			`}</style>
		</>
	);
};
export default Comment;
