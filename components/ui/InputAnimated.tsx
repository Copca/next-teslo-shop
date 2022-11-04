import { FC } from 'react';

interface Props {
	labelText?: string;
	className?: string;
}

export const InputAnimated: FC<Props> = ({ labelText, className }) => {
	return (
		<div className={` bg-slate-200 rounded-md pt-4 mb-4 w-full ${className}`}>
			<div className='relative border-b-2 rounded flex justify-center'>
				<input
					type='text'
					placeholder=' '
					className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
				/>
				<div
					className={`absolute top-full transition-all duration-300 w-0 h-0.5 peer-focus:w-full bg-sky-500 `}
				></div>
				<label
					className={`absolute bg-transparent -top-3 left-2 scale-75 px-1 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0.5 peer-placeholder-shown:left-2 peer-placeholder-shown:text-slate-500 peer-focus:-top-3 peer-focus:left-2 peer-focus:scale-75 peer-focus:text-sky-500`}
				>
					{labelText}
				</label>
			</div>
		</div>
	);
};
