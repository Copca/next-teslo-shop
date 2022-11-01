import { NextPage } from 'next';
import ShopLayout from '../components/layouts/ShopLayout';

const Error404: NextPage = () => {
	return (
		<ShopLayout
			tittle={'Page not Found'}
			pageDescription={'No hay nada que mostrar aquí'}
		>
			<div className='container flex-1 flex flex-col justify-center items-center'>
				<h6 className='text-5xl'>
					404 |
					<span className='ml-2 text-xl align-middle'>
						Página no encontrada
					</span>
				</h6>
			</div>
		</ShopLayout>
	);
};

export default Error404;
