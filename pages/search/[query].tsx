import { NextPage } from 'next';

import { useProducts } from '../../hooks/';

import { ShopLayout } from '../../components/layouts/';
import { ProductList } from '../../components/products';
import { Loading } from '../../components/ui';

const SearchPage: NextPage = () => {
	const { products, isLoading } = useProducts('/products');

	return (
		<ShopLayout
			tittle={'Teslo-Shop - Search'}
			pageDescription={'Encuentra los mejores productos de Teslo aquí'}
		>
			<div className='container'>
				<h1 className='text-2xl font-bold'>Buscar Producto</h1>
				<h2>ABC - 123</h2>

				{isLoading ? <Loading /> : <ProductList products={products} />}
			</div>
		</ShopLayout>
	);
};

export default SearchPage;
