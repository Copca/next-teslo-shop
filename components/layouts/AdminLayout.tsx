import { FC, PropsWithChildren } from 'react';

import { Navbar, SideMenu } from '../ui';
import { AdminNavbar } from '../admin';

interface Props {
	title: string;
	subTitle: string;
	icon?: JSX.Element;
}

export const AdminLayout: FC<PropsWithChildren<Props>> = ({
	title,
	subTitle,
	icon,
	children
}) => {
	return (
		<div className='min-h-screen flex flex-col'>
			<AdminNavbar />

			<div className='container mb-8'>
				<h1 className='flex items-center text-3xl font-bold'>
					{icon} {title}
				</h1>

				<h2 className='text-xl'>{subTitle}</h2>
			</div>

			<main className='flex-1 flex flex-col animate-fadeIn'>{children}</main>

			<SideMenu />
		</div>
	);
};
