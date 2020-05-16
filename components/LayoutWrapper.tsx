import react from "react";

export default function LayoutWrapper() {
	return (
		<style jsx global>{`
			html,
			body {
				margin: 0;
				padding: 0;
				overflow: hidden;
				background: #2088c2;
			}
			* {
				box-sizing: border-box;
			}
			::-webkit-scrollbar {
				width: 0px;
				background: transparent; /* make scrollbar transparent */
			}
			:global(@font-face) {
				font-family: "Satisfy";
				src: url("/fonts/Satisfy/Satisfy-Regular.ttf");
			}
			:global(@font-face) {
				font-family: "FrancoisOne";
				src: url("/fonts/Francois_One/FrancoisOne-Regular.ttf");
			}
			h1 {
				font-family: "Satisfy", sans-serif;
			}
			p,
			h2,
			h3,
			h4,
			h5,
			h6 {
				font-family: "FrancoisOne";
			}
		`}</style>
	);
}
