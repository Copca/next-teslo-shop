/**
 * Verificación y redireccionamiento del carrito en el Front-End
 */

import { useContext, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { CartContext } from '../../context';
import { ShopLayout } from '../../components/layouts';
import { CartList, CartOrderSumary } from '../../components/cart';

const CartPage: NextPage = () => {
	const router = useRouter();
	const { isLoaded, cart } = useContext(CartContext);

	useEffect(() => {
		if (isLoaded && cart.length === 0) {
			router.replace('/cart/empty');
		}
	}, [isLoaded, cart, router]);

	if (!isLoaded || cart.length === 0) return <></>;

	return (
		<ShopLayout title={'Carrito'} pageDescription={'Carrito de compras de la tienda'}>
			<div className='container'>
				<h1 className='text-2xl mb-8'>Carrito</h1>

				<div className='flex flex-col md:flex-row items-start gap-8'>
					<div className='w-full md:w-3/5'>
						<CartList editable />
					</div>

					<div className='w-full md:w-2/5 border shadow-md rounded-md p-4'>
						<CartOrderSumary />
					</div>
				</div>
			</div>
		</ShopLayout>
	);
};

export default CartPage;
