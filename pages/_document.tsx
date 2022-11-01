import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initalProps = await Document.getInitialProps(ctx);

		return initalProps;
	}

	render() {
		return (
			<Html lang='es'>
				<Head></Head>
				<body>
					<Main />
					<NextScript />
					<Script
						src='https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js'
						strategy='afterInteractive'
					/>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
