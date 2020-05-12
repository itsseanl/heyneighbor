import react from "react";

const BackSplash = () => {
	return (
		<>
			<div className="backsplash">
				<video src={"./city.mp4"} autoPlay></video>
			</div>
			<style jsx>{`
				div {
					height: 100vh;
					width: 100vw;
					overflow: hidden;
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					top: 0;
				}
				video {
					width: auto;
					height: 100%;
					opacity: 0.1;
				}
			`}</style>
		</>
	);
};
export default BackSplash;
