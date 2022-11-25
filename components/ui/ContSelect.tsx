import { FC, PropsWithChildren } from 'react';

interface Props {
	message?: string;
}

export const ContSelect: FC<PropsWithChildren<Props>> = ({ children, message }) => {
	return (
		<div>
			<div className={`bg-slate-200 rounded-md mb-0.5 w-full`}>
				<div className='relative border-b-2 rounded flex justify-center'>
					{children}
					<div
						className={`absolute top-full transition-all duration-300 w-0 h-0.5 peer-focus:w-full border-sky-500 bg-sky-500 `}
					></div>
				</div>
			</div>

			<p className='mt-1 ml-2 peer-invalid:visible text-pink-600 text-xs'>
				{message}
			</p>
		</div>
	);
};
