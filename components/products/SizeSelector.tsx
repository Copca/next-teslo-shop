import { ISize } from '../../interfaces/products';
import { FC } from 'react';

interface Props {
	selectedSize?: ISize;
	sizes: ISize[];
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
	return (
		<div className='flex justify-start space-x-8'>
			{sizes.map((size) => (
				<button
					key={size}
					className={
						selectedSize === size
							? 'bg-slate-800 text-white px-2 py-0.5 rounded'
							: 'font-bold'
					}
				>
					{size}
				</button>
			))}
		</div>
	);
};
