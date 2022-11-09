import { NextPage } from 'next';

import { useProducts } from '../hooks/useProducts';

import { ShopLayout } from '../components/layouts/';
import { ProductList } from '../components/products';
import { Loading } from '../components/ui';

const HomePage: NextPage = () => {
	const { products, isLoading } = useProducts('/products');

	console.log(isLoading);

	return (
		<ShopLayout
			tittle={'Teslo-Shop - Home'}
			pageDescription={'Encuentra los mejores productos de Teslo aquí'}
		>
			<div className='container'>
				<h1 className='text-2xl font-bold'>Tienda</h1>
				<h2>Todos los productos</h2>

				{isLoading ? <Loading /> : <ProductList products={products} />}
			</div>
		</ShopLayout>
	);
};

export default HomePage;
