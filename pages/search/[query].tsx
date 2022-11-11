/**
 * Creación de la página bajo demanda con SSR
 */
import { GetServerSideProps, NextPage } from 'next';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces/products';

import { ShopLayout } from '../../components/layouts/';
import { ProductList } from '../../components/products';

interface Props {
	products: IProduct[];
	foundProducts: boolean;
	query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
	return (
		<ShopLayout
			tittle={'Teslo-Shop - Search'}
			pageDescription={'Encuentra los mejores productos de Teslo aquí'}
		>
			<div className='container'>
				<h1 className='text-2xl font-bold mb-4'>Buscar Productos</h1>

				{foundProducts ? (
					<h6>
						Término de búsqueda:{' '}
						<span className='font-bold capitalize'>{query}</span>
					</h6>
				) : (
					<h6>
						No encontramos ningún producto con el término de busqueda:{' '}
						<span className='text-sky-500 font-bold capitalize'>{query}</span>
					</h6>
				)}

				<ProductList products={products} />
			</div>
		</ShopLayout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { query = '' } = params as { query: string };

	if (query.length === 0) {
		return {
			redirect: {
				destination: '/',
				permanent: true
			}
		};
	}

	let products = await dbProducts.getProductsByTerm(query);
	const foundProducts = products.length > 0; // true o false

	// Retornar otros productos en caso de no encotrar término
	if (!foundProducts) {
		products = await dbProducts.getProductsByTerm('shirt');
	}

	return {
		props: {
			products,
			foundProducts,
			query
		}
	};
};

export default SearchPage;
