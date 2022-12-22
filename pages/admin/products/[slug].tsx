import { GetServerSideProps, NextPage } from 'next';

import { TiEdit } from 'react-icons/ti';

import { dbProducts } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces';

import { AdminLayout } from '../../../components/layouts';
import { FormProduct } from '../../../components/admin';

interface Props {
	product: IProduct;
}

const ProductSlugPage: NextPage<Props> = ({ product }) => {
	return (
		<AdminLayout
			title='Producto'
			subTitle={`Editando: ${product.title}`}
			icon={<TiEdit className='mr-2' />}
		>
			<div className='container'>
				<FormProduct product={product} />
			</div>
		</AdminLayout>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { slug } = params as { slug: string };

	let product: IProduct | null;

	if (slug === 'new') {
		// Crear nuevo producto
		const tempProduct = JSON.parse(JSON.stringify(new Product()));

		delete tempProduct._id;
		tempProduct.images = ['/img1.jpg', '/img2.jpg'];
		product = tempProduct;
	} else {
		product = await dbProducts.getProductBySlug(slug);
	}

	if (!product) {
		return {
			redirect: {
				destination: '/admin/products',
				permanent: false
			}
		};
	}

	return {
		props: {
			product
		}
	};
};

export default ProductSlugPage;
