import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';

interface Props {
	title: string;
}

export const AuthLayout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>

			<main className='flex justify-center items-center bg-slate-50 h-screen'>
				{children}
			</main>
		</>
	);
};
