/**
 * Redireccionamiento de la página con SSR
 */
import { GetServerSideProps, NextPage } from 'next';

import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

import { ShopLayout } from '../../components/layouts';
import { CartList, OrderSummary } from '../../components/cart';
import { Chip } from '../../components/ui';

interface Props {
	order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
	return (
		<ShopLayout title={'Resumen de orden'} pageDescription={'Resumen de la orden'}>
			<div className='container animate-fadeIn'>
				<h1 className='text-2xl mb-8'>Orden {order._id}</h1>

				<Chip pagado={order.isPaid} className='mb-4' />

				<div className='flex flex-col md:flex-row items-start gap-8'>
					<div className='w-full md:w-3/5'>
						<CartList products={order.orderItems} />
					</div>

					<div className='w-full md:w-2/5'>
						<OrderSummary order={order} />
					</div>
				</div>
			</div>
		</ShopLayout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
	const { id = '' } = params as { id: string };
	const session = await unstable_getServerSession(req, res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: `/auth/login?p=/orders/${id}`,
				permanent: false
			}
		};
	}

	// Obtenemos la orden de la DB
	const order = await dbOrders.getOrderById(id);

	if (!order) {
		return {
			redirect: {
				destination: '/orders/history',
				permanent: false
			}
		};
	}

	// Redireccionamos si la orden no corresponde al usuario en session
	if (order.user !== session.user?._id) {
		return {
			redirect: {
				destination: '/orders/history',
				permanent: false
			}
		};
	}

	return {
		props: {
			order
		}
	};
};

export default OrderPage;
