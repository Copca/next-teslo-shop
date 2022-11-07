import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';

interface Props {
	tittle: string;
}

export const AuthLayout: FC<PropsWithChildren<Props>> = ({ children, tittle }) => {
	return (
		<>
			<Head>
				<title>{tittle}</title>
			</Head>

			<main className='flex justify-center items-center bg-slate-50 h-screen'>
				{children}
			</main>
		</>
	);
};
