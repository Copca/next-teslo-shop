import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { AuthProvider, CartProvider, UiProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{
				fetcher: (resource, init) =>
					fetch(resource, init).then((res) => res.json())
			}}
		>
			<AuthProvider>
				<CartProvider>
					<UiProvider>
						<Component {...pageProps} />
					</UiProvider>
				</CartProvider>
			</AuthProvider>
		</SWRConfig>
	);
}

export default MyApp;
