import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { initialData } from '../../database/products';
import { Counter } from '../ui';

const productsInCard = [
	initialData.products[0],
	initialData.products[1],
	initialData.products[2]
];

interface Props {
	editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
	return (
		<>
			{productsInCard.map((product) => (
				<div
					key={product.slug}
					className='flex flex-col items-center md:flex-row md:items-start gap-4 mb-4'
				>
					<div>
						{/* TODO: Leevar a la página del prouducto */}
						<Link href={'/product/slug'}>
							<Image
								src={`/products/${product.images[0]}`}
								alt={product.title}
								width={200}
								height={200}
								className='inline-block shadow'
							/>
						</Link>
					</div>

					<div className='flex-1 flex justify-between py-4'>
						<div>
							<h4 className='text-slate-800 text-lg font-bold mb-2'>
								{product.title}
							</h4>
							{editable && <Counter />}
						</div>

						<div className='text-center'>
							<p className='text-lg font-bold'>$ {product.price}</p>

							{editable && (
								<button className='text-blue-500 hover:text-blue-600 font-bold text-sm transition-colors'>
									Remover
								</button>
							)}
						</div>
					</div>
				</div>
			))}
		</>
	);
};
