import { NextPage } from 'next';

import { ShopLayout } from '../../components/layouts';
import { CartList, OrderSumary } from '../../components/cart';

const CartPage: NextPage = () => {
	return (
		<ShopLayout
			tittle={'Carrito'}
			pageDescription={'Carrito de compras de la tienda'}
		>
			<div className='container'>
				<h1 className='text-2xl mb-8'>Carrito</h1>

				<div className='flex flex-col md:flex-row items-start gap-8'>
					<div className='w-full md:w-3/5'>
						<CartList editable />
					</div>

					<div className='w-full md:w-2/5 border shadow-md rounded-md p-4'>
						<OrderSumary />
					</div>
				</div>
			</div>
		</ShopLayout>
	);
};

export default CartPage;
