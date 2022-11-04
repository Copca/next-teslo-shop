import { NextPage } from 'next';

import { initialData } from '../../database/products';

import { ShopLayout } from '../../components/layouts';
import { ProductSlide, SizeSelector } from '../../components/products';
import { Counter } from '../../components/ui';

const product = initialData.products[0];

const ProductPage: NextPage = () => {
	return (
		<ShopLayout tittle={product.title} pageDescription={product.description}>
			<div className='container flex gap-8 text-slate-800'>
				<div className='w-3/5'>
					<ProductSlide images={product.images} />
				</div>

				<div className='w-2/5'>
					<h1 className='text-2xl font-bold'>{product.title}</h1>
					<p className='text-xl mb-8'>$ {product.price}</p>

					<Counter />

					<SizeSelector sizes={product.sizes} />

					<button
						className='btn bg-blue-500 hover:bg-blue-600 w-full my-4 rounded-full'
						data-mdb-ripple='true'
					>
						Agregar al carrito
					</button>

					<div className='text-red-500 font-bold border uppercase text-xs border-red-500 rounded-full text-center py-2 my-4'>
						No hay disponibles
					</div>

					<div>
						<h6 className='font-bold'>Descripción</h6>
						<p>{product.description}</p>
					</div>
				</div>
			</div>
		</ShopLayout>
	);
};

export default ProductPage;
