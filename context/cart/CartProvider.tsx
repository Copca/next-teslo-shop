import { FC, PropsWithChildren, useReducer } from 'react';

import { CartContext, cartReducer } from './';
import { ICartProduct, IProduct } from '../../interfaces';

export interface CartState {
	cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
	cart: []
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

	const addProduct = (product: ICartProduct) => {
		// Solo agrega el producto si el ID aún no esta en el carrito
		const productInCart = state.cart.some(
			(productState) => productState._id === product._id
		);

		if (!productInCart) {
			return dispatch({
				type: '[Cart] - Update Products in Cart',
				payload: [...state.cart, product]
			});
		}

		// Agrega producto al carrito con diferente talla
		const productInCartButDifferentSize = state.cart.some(
			(productState) =>
				productState._id === product._id && productState.size === product.size
		);

		if (!productInCartButDifferentSize) {
			return dispatch({
				type: '[Cart] - Update Products in Cart',
				payload: [...state.cart, product]
			});
		}

		// Si el producto ya esta en el carrito y se selecciona otro igual (talla) se actualiza la cantidad
		const updatedProducts = state.cart.map((productState) => {
			if (productState._id !== product._id) return product;
			if (productState.size !== product.size) return product;

			// Actualizar la cantidad
			productState.quantity += product.quantity;

			return productState;
		});

		dispatch({ type: '[Cart] - Update Products in Cart', payload: updatedProducts });
	};

	return (
		<CartContext.Provider
			value={{
				// State
				...state,

				// Metodos
				addProduct
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
