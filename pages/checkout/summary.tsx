import { NextPage } from 'next';

import { ShopLayout } from '../../components/layouts';
import { CartList, OrderConfirm } from '../../components/cart';

const SummaryPage: NextPage = () => {
	return (
		<ShopLayout tittle={'Resumen de orden'} pageDescription={'Resumen de la orden'}>
			<div className='container'>
				<h1 className='text-2xl mb-8'>Resumen de la orden</h1>

				<div className='flex flex-col md:flex-row items-start gap-8'>
					<div className='w-full md:w-3/5'>
						<CartList />
					</div>

					<div className='w-full md:w-2/5 border shadow-md rounded-md p-4'>
						<OrderConfirm />
					</div>
				</div>
			</div>
		</ShopLayout>
	);
};

export default SummaryPage;
