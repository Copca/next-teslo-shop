import Link from 'next/link';

export const OrderConfirm = () => {
	return (
		<div className='p-4'>
			<h2 className='text-xl'>Resumen (3) Producto</h2>
			<hr className='mb-8' />

			<div className='flex justify-between mb-2'>
				<h6 className='text-lg font-bold'>Dirección de entrega</h6>
				<Link href={'#'} className='underline'>
					Editar
				</Link>
			</div>

			<p>Ernesto Israel Copca Soriano</p>
			<p>Jinete No. 39 int. 401</p>
			<p>CDMX</p>
			<p>01430</p>
			<p>México</p>
			<p>55 39 39 48 70</p>

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

			<Link
				href={'#'}
				className='btn bg-blue-500 hover:bg-blue-600 rounded-full w-full mt-4'
			>
				Confirmar Orden
			</Link>
		</div>
	);
};
