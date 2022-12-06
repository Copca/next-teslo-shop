import { FC } from 'react';

import { CardSummary } from './CardSummary';
import { Chip } from '../ui';
import { IOrder } from '../../interfaces';

interface Props {
	order: IOrder;
}

export const OrderSummary: FC<Props> = ({ order }) => {
	// const { numberOfItems, subTotal, tax, total, shippingAddress } = order;

	return (
		<div className='border shadow-md rounded-md p-4'>
			<CardSummary orderValues={order} />

			<h4 className='text-xl font-bold my-8'>Pagar:</h4>

			<Chip pagado={order.isPaid} className='w-full' />
		</div>
	);
};
