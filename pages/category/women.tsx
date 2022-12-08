/**
 * al usar Client-Side-Rendering con el hook SWR, evitamos almacenar en un Context la data, ya que SWR la almacena en cache y evita hacer la consulta cada vez que sea solicitada enviando un estado 304
 */

import { NextPage } from 'next';

import { useProducts } from '../../hooks/';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { Loading } from '../../components/ui';

const WomenPage: NextPage = () => {
	const { products, isLoading } = useProducts('/products?gender=women');

	return (
		<ShopLayout
			title={'Teslo-Shop - Mujeres'}
			pageDescription={'Encuentre los mejores productos de Teslo para Mujeres'}
		>
			<div className='container'>
				<h1 className='text-2xl font-bold'>Mujeres</h1>

				{isLoading ? <Loading /> : <ProductList products={products} />}
			</div>
		</ShopLayout>
	);
};

export default WomenPage;
