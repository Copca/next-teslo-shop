import { FC } from 'react';
import { countries } from '../../utils/countries';

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
					{countries.map((country) => (
						<option key={country.code} value={country.code}>
							{country.name}
						</option>
					))}
				</select>
				<div
					className={`absolute top-full transition-all duration-300 w-0 h-0.5 peer-focus:w-full border-sky-500 bg-sky-500 `}
				></div>
			</div>
		</div>
	);
};
