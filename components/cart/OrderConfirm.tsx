import { FC, useContext } from 'react';
import Link from 'next/link';

import { CartContext } from '../../context';

import { Chip } from '../ui';
import { countries } from '../../utils';

interface Props {
	pay?: boolean;
}

export const OrderConfirm: FC<Props> = ({ pay = false }) => {
	const { shippingAddress, numberOfItems } = useContext(CartContext);

	if (!shippingAddress) return <></>;

	const { firstName, lastName, address, address2, city, zip, country, phone } =
		shippingAddress;

	return (
		<div className='p-4'>
			<h2 className='text-xl'>
				Resumen ({numberOfItems}) {numberOfItems === 1 ? 'Productos' : 'Producto'}
			</h2>
			<hr className='mb-8' />

			<div className='flex justify-between mb-2'>
				<h6 className='text-lg font-bold'>Dirección de entrega</h6>
				<Link href={'#'} className='underline'>
					Editar
				</Link>
			</div>

			<p>
				{firstName} {lastName}
			</p>
			<p>
				{address} {address2 ? `, ${address2}` : ''}
			</p>
			<p>{city}</p>
			<p>{zip}</p>
			<p>{countries.find((c) => c.code === country)?.name}</p>
			<p>{phone}</p>

			<hr />

			<div className='flex justify-end mt-8 mb-2'>
				<Link href={'#'} className='underline'>
					Editar
				</Link>
			</div>

			<div className='flex justify-between'>
				<p>No. Productos</p>
				<p>3 productos</p>
			</div>

			<div className='flex justify-between'>
				<p>Subtotal</p>
				<p>$ 75</p>
			</div>

			<div className='flex justify-between'>
				<p>Impuestos 15%</p>
				<p>$ 11.25</p>
			</div>

			<div className='flex justify-between text-lg font-bold mt-3'>
				<p>Total:</p>
				<p>$ 86.25</p>
			</div>

			{pay ? (
				<>
					<h1 className='text-xl font-bold my-8'>Pagar:</h1>

					<Chip pagado />
				</>
			) : (
				<Link
					href={'#'}
					className='btn bg-blue-500 hover:bg-blue-600 rounded-full w-full mt-4'
				>
					Confirmar Orden
				</Link>
			)}
		</div>
	);
};
