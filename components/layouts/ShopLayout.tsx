import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';

import { Navbar } from '../ui';

interface Props {
	tittle: string;
	pageDescription: string;
	imageFullUrl?: string;
}

export const ShopLayout: FC<PropsWithChildren<Props>> = ({
	tittle,
	pageDescription,
	imageFullUrl,
	children
}) => {
	return (
		<div className='min-h-screen flex flex-col'>
			<Head>
				<title>{tittle}</title>
				<meta name='description' content={pageDescription} />

				<meta name='og:tittle' content={tittle} />
				<meta name='og:description' content={pageDescription} />
				{imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
			</Head>

			<Navbar />

			{/* TODO: Sidebar */}

			<main className='flex-1 flex flex-col'>{children}</main>

			<footer>{/* TODO: Footer */}</footer>
		</div>
	);
};
