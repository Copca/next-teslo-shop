import { NextPage } from 'next';

import { initialData } from '../database/products';

import { ShopLayout } from '../components/layouts/';
import { SideMenu } from '../components/ui';
import { ProductList } from '../components/products';

const Home: NextPage = () => {
	return (
		<ShopLayout
			tittle={'Teslo-Shop - Home'}
			pageDescription={'Encuentra los mejores productos de Teslo aquí'}
		>
			<div className='container'>
				<h1 className='text-2xl font-bold'>Tienda</h1>
				<h2>Todos los productos</h2>

				<ProductList products={initialData.products as any} />
			</div>

			<SideMenu />
		</ShopLayout>
	);
};

export default Home;
