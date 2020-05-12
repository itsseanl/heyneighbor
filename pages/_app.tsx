// import App from 'next/app'
import { Auth0Provider } from "use-auth0-hooks";
import LayoutWrapper from "../components/LayoutWrapper";
function MyApp({ Component, pageProps }) {
	return (
		<>
			<Auth0Provider
				domain={"itsseanl.auth0.com"}
				clientId={"C9BdmJfXRV4j3lbPR14GU8l1CC7BgbQY"}
				redirectUri={"http://localhost:3000/"}
			>
				<Component {...pageProps} />
			</Auth0Provider>
			<LayoutWrapper />
		</>
	);
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
