import { useEffect } from 'react';
import { NextPage } from 'next';
import Cookies from 'js-cookie';

import { ShopLayout } from '../../components/layouts';
import { CartList, CheckoutSummary } from '../../components/cart';
import { useRouter } from 'next/router';

const SummaryPage: NextPage = () => {
	const router = useRouter();

	// Negar el acceso si no hay una dirección en ShippingAddress
	useEffect(() => {
		if (!Cookies.get('firstName')) {
			router.push('/checkout/address');
		}
	}, [router]);

	return (
		<ShopLayout title={'Resumen de orden'} pageDescription={'Resumen de la orden'}>
			<div className='container'>
				<h1 className='text-2xl mb-8'>Resumen de la orden</h1>

				<div className='flex flex-col md:flex-row items-start gap-8'>
					<div className='w-full md:w-3/5'>
						<CartList />
					</div>

					<div className='w-full md:w-2/5'>
						<CheckoutSummary />
					</div>
				</div>
			</div>
		</ShopLayout>
	);
};

export default SummaryPage;
