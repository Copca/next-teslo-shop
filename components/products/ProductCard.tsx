import { FC, useMemo, useState } from 'react';
import Image from 'next/image';

import { IProduct } from '../../interfaces/products';

interface Props {
	product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
	const [isHovered, setIsHovered] = useState(false);

	// Con useMemo nos aseguramos que solo se ejecute si isHovered cambia
	const productImage = useMemo(() => {
		return isHovered
			? `/products/${product.images[0]}`
			: `/products/${product.images[1]}`;
	}, [isHovered, product.images]);

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className='animate-fadeIn'
		>
			<button data-mdb-ripple='true'>
				<Image
					src={productImage}
					width={300}
					height={300}
					alt={`imagen ${product.title}`}
					priority
					className='rounded-md shadow'
				/>
			</button>

			<h6>{product.title}</h6>
			<p>$ {product.price}</p>
		</div>
	);
};
