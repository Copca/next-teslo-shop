import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';

import { Navbar, SideMenu } from '../ui';

interface Props {
	title: string;
	pageDescription: string;
	imageFullUrl?: string;
}

export const ShopLayout: FC<PropsWithChildren<Props>> = ({
	title,
	pageDescription,
	imageFullUrl,
	children
}) => {
	return (
		<div className='min-h-screen flex flex-col'>
			<Head>
				<title>{title}</title>
				<meta name='description' content={pageDescription} />

				<meta name='og:tittle' content={title} />
				<meta name='og:description' content={pageDescription} />
				{imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
			</Head>

			<Navbar />

			{/* TODO: Sidebar */}

			<main className='flex-1 flex flex-col'>{children}</main>

			<SideMenu />

			<footer>{/* TODO: Footer */}</footer>
		</div>
	);
};
