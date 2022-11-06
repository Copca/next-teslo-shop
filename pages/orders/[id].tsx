import { NextPage } from 'next';
import { MdCreditScore, MdOutlineCreditCardOff } from 'react-icons/md';

import { ShopLayout } from '../../components/layouts';
import { CartList, OrderConfirm } from '../../components/cart';

const OrderPage: NextPage = () => {
	return (
		<ShopLayout
			tittle={'Resumen de orden ABC123'}
			pageDescription={'Resumen de la orden'}
		>
			<div className='container'>
				<h1 className='text-2xl mb-8'>Orden ABC123</h1>

				{/* <div className='inline-flex items-center text-red-500 font-bold border-2 border-red-500 rounded-full px-3 py-2 space-x-3 mb-4'>
					<MdOutlineCreditCardOff className='text-xl' />
					<p>Pendiente de Pago</p>
				</div> */}

				<div className='inline-flex items-center text-green-500 font-bold border-2 border-green-500 rounded-full px-3 py-2 space-x-3 mb-4'>
					<MdCreditScore className='text-xl' />
					<p>Pagado</p>
				</div>

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
