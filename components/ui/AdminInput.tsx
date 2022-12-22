import { FC, PropsWithChildren } from 'react';

interface Props {
	label: string;
	message?: string;
}

export const AdminInput: FC<PropsWithChildren<Props>> = ({
	label,
	message,
	children
}) => {
	return (
		<div>
			<div className={`bg-slate-200 rounded-md pt-4 mb-0.5 w-full`}>
				<div className='relative border-b-2 rounded flex justify-center'>
					{children}

					<div className='border-animated'></div>
					<label className='label-float2'>{label}</label>
				</div>
			</div>

			<p className='mt-1 ml-2 peer-invalid:visible text-pink-600 text-xs'>
				{message}
			</p>
		</div>
	);
};
