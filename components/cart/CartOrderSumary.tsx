import { useContext } from 'react';
import Link from 'next/link';

import { CartContext } from '../../context';
import { divisa } from '../../utils';

export const CartOrderSumary = () => {
	const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

	return (
		<div className='p-4'>
			<h2 className='text-xl'>Orden</h2>
			<hr className='mb-8' />

			<div className='flex justify-between'>
				<h6>No. Productos</h6>
				<p>
					{numberOfItems} {numberOfItems > 1 ? 'Productos' : 'Producto'}
				</p>
			</div>

			<div className='flex justify-between'>
				<h6>Subtotal</h6>
				<p>{divisa.formatearDinero(subTotal)}</p>
			</div>

			<div className='flex justify-between'>
				<h6>Impuestos {Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%</h6>
				<p>{divisa.formatearDinero(tax)}</p>
			</div>

			<div className='flex justify-between text-xl font-bold mt-4'>
				<h6>Total:</h6>
				<p>{divisa.formatearDinero(total)}</p>
			</div>

			<Link
				href={'/checkout/address'}
				className='btn bg-blue-500 hover:bg-blue-600 rounded-full w-full mt-4'
			>
				Checkout
			</Link>
		</div>
	);
};
