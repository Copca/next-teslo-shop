/**
 * Se puede hacer la restricción de acceso a usuarios autenticados, por medio de SSR usando getServerSideProps pero es recomendado usar middlewares
 */

import { NextPage } from 'next';

import { ShopLayout } from '../../components/layouts';
import { InputAnimated, SelectAnimated } from '../../components/ui';

const AddressPage: NextPage = () => {
	return (
		<ShopLayout
			tittle={'Dirección'}
			pageDescription={'Confirmar dirección del destino'}
		>
			<div className='container'>
				<h1 className='text-2xl mb-8'>Dirección</h1>

				<div className='max-w-5xl grid md:grid-cols-2 gap-3 mx-auto'>
					<InputAnimated labelText='Nombre' />
					<InputAnimated labelText='Apellido' />
					<InputAnimated labelText='Dirección' />
					<InputAnimated labelText='Dirección 2' />
					<InputAnimated labelText='Codigo Postal' />
					<InputAnimated labelText='Ciudad' />
					<SelectAnimated />
					<InputAnimated labelText='Teléfono' />
				</div>

				<div className='flex justify-center'>
					<button className='btn bg-blue-500 hover:bg-blue-600 rounded-full mt-8'>
						Revisar Pedido
					</button>
				</div>
			</div>
		</ShopLayout>
	);
};

export default AddressPage;

/**
 * Autenticación y/o redireccionamiento por SSR
 */
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
// 	const { token = '' } = req.cookies;

// 	let isValidToken = false;

// 	try {
// 		await jwt.isValidToken(token);
// 		isValidToken = true;
// 	} catch (error) {
// 		isValidToken = false;
// 	}

// 	if (!isValidToken) {
// 		return {
// 			redirect: {
// 				destination: '/auth/login?p=/checkout/address',
// 				permanent: false
// 			}
// 		};
// 	}

// 	return {
// 		props: {}
// 	};
// };
