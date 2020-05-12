import react from "react";

const Navigation = ({ user, loading }) => {
	console.log(user + loading);
	return (
		<>
			<nav>
				<ul>
					{!user && !loading ? (
						<li>
							<a href="/api/login">Signup</a>
						</li>
					) : null}

					{user && !loading ? (
						<>
							<li>
								<a href="/feed">Feed</a>
							</li>
							<li>
								<a href="/dashboard">
									<img src={user.picture} />
								</a>
							</li>
						</>
					) : null}

					<li>
						{user && !loading ? <a href="/api/logout">Logout</a> : null}
						{!user && !loading ? <a href="/api/login">Login</a> : null}
					</li>
				</ul>
			</nav>
			<style jsx>{`
				nav {
					position: fixed;
					bottom: 0;
					background: #fff;
					width: 100%;
					height: 75px;
				}

				ul {
					display: flex;
					justify-content: center;
					height: 100%;
					align-items: center;
					width: 100%;
					padding-left: 0;
					margin: 0;
					list-style: none;
				}
				li {
					padding: 15px;

					text-align: center;
					font-size: 1em;
					transition: 0.3s all;
				}
				a {
					margin: 10px;
					text-decoration: none;
					color: #333;
					text-transform: uppercase;
					font-family: "FrancoisOne";
					font-size: 1.5em;
					height: 100%;
					width: auto;
					transition: 0.3s all;
					z-index: 3;
				}
				li:hover {
					transform: scale(1.1);
				}

				a > img {
					height: 50px;
					width: 50px;
					border: 2px solid #333;
					margin: 0;
					margin-top: 6px;
					padding: 0;
				}
			`}</style>
		</>
	);
};
export default Navigation;
