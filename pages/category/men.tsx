/**
 * al usar Client-Side-Rendering con el hook SWR, evitamos almacenar en un Context la data, ya que SWR la almacena en cache y evita hacer la consulta cada vez que sea solicitada enviando un estado 304
 */

import { NextPage } from 'next';

import { useProducts } from '../../hooks/';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { Loading } from '../../components/ui';

const MenPage: NextPage = () => {
	const { products, isLoading } = useProducts('/products?gender=men');

	return (
		<ShopLayout
			title={'Teslo-Shop - Hombre'}
			pageDescription={'Encuentre los mejores productos de Teslo para Hombres'}
		>
			<div className='container'>
				<h1 className='text-2xl font-bold'>Hombres</h1>

				{isLoading ? <Loading /> : <ProductList products={products} />}
			</div>
		</ShopLayout>
	);
};

export default MenPage;
