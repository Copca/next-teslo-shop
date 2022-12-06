import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { CartContext } from '../../context';

import { CardSummary } from './CardSummary';

export const CheckoutSummary = () => {
	const router = useRouter();
	const { shippingAddress, createOrder } = useContext(CartContext);

	const [isPosting, setIsPosting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const onCreateOrder = async () => {
		setIsPosting(true);

		// En message se retorna el _id de la orden o mensaje de error
		const { hasError, message } = await createOrder();

		if (hasError) {
			setIsPosting(false);
			setErrorMessage(message);
			return;
		}

		// redirecciono a /orders/[id]
		router.replace(`/orders/${message}`);
	};

	if (!shippingAddress) return <></>;

	return (
		<div className='border shadow-md rounded-md p-4'>
			<CardSummary editable shippingAddress={shippingAddress} />

			<div>
				<button
					className='btn bg-blue-500 hover:bg-blue-600 rounded-full w-full mt-4 disabled:opacity-40'
					disabled={isPosting}
					onClick={onCreateOrder}
				>
					Confirmar Orden
				</button>

				{errorMessage && (
					<div className='bg-red-500 text-white rounded-full text-center text-xs py-2 mt-4'>
						{errorMessage}
					</div>
				)}
			</div>
		</div>
	);
};
