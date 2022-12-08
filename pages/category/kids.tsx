/**
 * al usar Client-Side-Rendering con el hook SWR, evitamos almacenar en un Context la data, ya que SWR la almacena en cache y evita hacer la consulta cada vez que sea solicitada enviando un estado 304
 */

import { NextPage } from 'next';

import { useProducts } from '../../hooks/';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { Loading } from '../../components/ui';

const KidsPage: NextPage = () => {
	const { products, isLoading } = useProducts('/products?gender=kid');

	return (
		<ShopLayout
			title={'Teslo-Shop - Kids'}
			pageDescription={'Encuentre los mejores productos de Teslo para Niños'}
		>
			<div className='container'>
				<h1 className='text-2xl font-bold'>Niños</h1>

				{isLoading ? <Loading /> : <ProductList products={products} />}
			</div>
		</ShopLayout>
	);
};

export default KidsPage;
