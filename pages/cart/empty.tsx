import { NextPage } from 'next';
import Link from 'next/link';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';

import { ShopLayout } from '../../components/layouts';

const EmptyPage: NextPage = () => {
	return (
		<ShopLayout
			title={'Carrito vacio'}
			pageDescription={'No hay articulos en el carrito de compras'}
		>
			<div className='container flex-1 flex flex-col justify-center items-center'>
				<div className='flex items-center gap-4'>
					<MdOutlineRemoveShoppingCart className='text-8xl' />
					<div>
						<h1 className='text-xl mb-2'>Su carrito esta vacio</h1>
						<Link href={'/'} className='text-3xl text-blue-600'>
							Regresar
						</Link>
					</div>
				</div>
			</div>
		</ShopLayout>
	);
};

export default EmptyPage;
