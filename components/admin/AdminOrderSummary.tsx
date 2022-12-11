import { FC } from 'react';

import { IOrder } from '../../interfaces';

import { CardSummary } from '../cart';
import { Chip } from '../ui';

interface Props {
	order: IOrder;
}

export const AdminOrderSummary: FC<Props> = ({ order }) => {
	return (
		<div className='border shadow-md rounded-md p-4'>
			<CardSummary orderValues={order} />

			<Chip pagado={order.isPaid} className='w-full' />
		</div>
	);
};
