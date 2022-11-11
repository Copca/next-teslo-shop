import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { IProduct } from '../../interfaces/products';

interface Props {
	product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link
			href={`/product/${product.slug}`}
			prefetch={false}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className='animate-fadeIn flex flex-col items-center'
		>
			<button data-mdb-ripple='true'>
				<Image
					src={
						isHovered
							? `/products/${product.images[0]}`
							: `/products/${product.images[1]}`
					}
					width={300}
					height={300}
					alt={`imagen ${product.title}`}
					priority
					className={`rounded-md shadow ${isHovered && 'animate-fadeIn'}`}
				/>
			</button>

			<div className='text-left px-4'>
				<h6>{product.title}</h6>
				<p>$ {product.price}</p>
			</div>
		</Link>
	);
};
