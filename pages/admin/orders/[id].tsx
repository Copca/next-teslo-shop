import { GetServerSideProps, NextPage } from 'next';

import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';

import { AdminLayout } from '../../../components/layouts';
import { CartList } from '../../../components/cart';
import { Chip } from '../../../components/ui';
import { AdminOrderSummary } from '../../../components/admin';

interface Props {
	order: IOrder;
}

const AdminOrderIdPage: NextPage<Props> = ({ order }) => {
	return (
		<AdminLayout title='Orden' subTitle={`Orden: ${order._id}`}>
			<div className='container animate-fadeIn'>
				<Chip pagado={order.isPaid} className='mb-4' />

				<div className='flex flex-col md:flex-row items-start gap-8'>
					<div className='w-full md:w-3/5'>
						<CartList products={order.orderItems} />
					</div>

					<div className='w-full md:w-2/5'>
						<AdminOrderSummary order={order} />
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as { id: string };

	const order = await dbOrders.getOrderById(id);

	if (!order) {
		return {
			redirect: {
				destination: '/admin/orders',
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

export default AdminOrderIdPage;
