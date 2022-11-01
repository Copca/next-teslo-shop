import { FC } from 'react';

import { IProduct } from '../../interfaces/products';
import { ProductCard } from './';

interface Props {
	products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
	return (
		<div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 text-slate-700 font-bold'>
			{products.map((product) => (
				<ProductCard key={product.slug} product={product} />
			))}
		</div>
	);
};
