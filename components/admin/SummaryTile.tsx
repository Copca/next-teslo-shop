import { FC } from 'react';

interface Props {
	title: string | number;
	subtitle: string;
	icon: JSX.Element;
}

export const SummaryTile: FC<Props> = ({ title, subtitle, icon }) => {
	return (
		<div className='inline-flex items-center space-x-3 border rounded-md shadow-md p-4 min-h-[132px]'>
			{icon}

			<div className='text-center'>
				<h3 className='text-5xl'>{title}</h3>
				<p className='text-slate-500'>{subtitle}</p>
			</div>
		</div>
	);
};
