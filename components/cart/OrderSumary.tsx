import Link from 'next/link';

export const OrderSumary = () => {
	return (
		<div className='p-4'>
			<h2>Orden</h2>
			<hr className='mb-8' />

			<div className='flex justify-between'>
				<h6>No. Productos</h6>
				<p>3 Productos</p>
			</div>

			<div className='flex justify-between'>
				<h6>Subtotal</h6>
				<p>$ 75</p>
			</div>

			<div className='flex justify-between'>
				<h6>Impuestos 15%</h6>
				<p>$ 11.75</p>
			</div>

			<div className='flex justify-between text-xl font-bold mt-4'>
				<h6>Total:</h6>
				<p>$ 86.25</p>
			</div>

			<Link
				href={'#'}
				className='btn bg-blue-500 hover:bg-blue-600 rounded-full w-full mt-4'
			>
				Checkout
			</Link>
		</div>
	);
};
