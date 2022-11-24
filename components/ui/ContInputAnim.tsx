import { FC, PropsWithChildren } from 'react';

interface Props {
	label: string;
}

export const ContInputAnim: FC<PropsWithChildren<Props>> = ({ children, label }) => {
	return (
		<div className={`bg-slate-200 rounded-md pt-4 mb-0.5 w-full`}>
			<div className='relative border-b-2 rounded flex justify-center'>
				{children}

				<div className='border-animated'></div>
				<label className='label-float2'>{label}</label>
			</div>
		</div>
	);
};
