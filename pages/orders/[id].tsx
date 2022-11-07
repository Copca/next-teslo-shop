import { NextPage } from 'next';
import { MdCreditScore, MdOutlineCreditCardOff } from 'react-icons/md';

import { ShopLayout } from '../../components/layouts';
import { CartList, OrderConfirm } from '../../components/cart';
import { Chip } from '../../components/ui';

const OrderPage: NextPage = () => {
	return (
		<ShopLayout
			tittle={'Resumen de orden ABC123'}
			pageDescription={'Resumen de la orden'}
		>
			<div className='container'>
				<h1 className='text-2xl mb-8'>Orden ABC123</h1>

				<Chip pagado className='mb-4' />

				<div className='flex flex-col md:flex-row items-start gap-8'>
					<div className='w-full md:w-3/5'>
						<CartList />
					</div>

					<div className='w-full md:w-2/5 border shadow-md rounded-md p-4'>
						<OrderConfirm pay />
					</div>
				</div>
			</div>
		</ShopLayout>
	);
};

export default OrderPage;
