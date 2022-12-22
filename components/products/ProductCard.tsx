import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { IProduct } from '../../interfaces';

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
			className=' flex flex-col items-center'
		>
			<div className='relative'>
				{!product.inStock && (
					<div className='absolute top-2 right-2 bg-slate-900 text-white text-sm text-center rounded-full py-1 px-2 z-10'>
						No hay disponibles
					</div>
				)}

				<button data-mdb-ripple='true' className='relative'>
					<Image
						src={isHovered ? product.images[0] : product.images[1]}
						width={300}
						height={300}
						alt={`imagen ${product.title}`}
						priority
						className={`rounded-md shadow ${
							isHovered && 'animate-[fadeIn_1.5s_ease-in-out_1]'
						}`}
					/>
				</button>

				<div className='text-left px-4'>
					<h6>{product.title}</h6>
					<p>$ {product.price}</p>
				</div>
			</div>
		</Link>
	);
};
