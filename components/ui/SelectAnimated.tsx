import { FC } from 'react';

interface Props {
	className?: string;
}

export const SelectAnimated: FC<Props> = ({ className }) => {
	return (
		<div className={`bg-slate-200 rounded-md mb-0.5 w-full ${className}`}>
			<div className='relative border-b-2 rounded flex justify-center'>
				<select
					name=''
					id=''
					className='outline-none bg-transparent w-full mt-4 py-2 mb-1 mx-8 peer'
				>
					<option value=''>-- Selecciona un País--</option>
					<option value='1'>México</option>
					<option value='2'>Honduras</option>
					<option value='3'>Colombia</option>
					<option value='4'>Perú</option>
				</select>
				<div
					className={`absolute top-full transition-all duration-300 w-0 h-0.5 peer-focus:w-full border-sky-500 bg-sky-500 `}
				></div>
			</div>
		</div>
	);
};
