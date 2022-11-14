import { FC, PropsWithChildren, useEffect, useReducer, useRef, useState } from 'react';
import Cookie from 'js-cookie';

import { CartContext, cartReducer } from './';
import { ICartProduct } from '../../interfaces';

export interface CartState {
	cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
	cart: []
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
	const [isMounted, setIsMounted] = useState(false);

	// Obtenemos el carrito de las Cookies la primera vez que se carga el componente (primer renderizado)
	useEffect(() => {
		if (!isMounted) {
			// usando el trycatch prevenimos un error si modifican las cookies en en navegador
			try {
				const cookieProducts = JSON.parse(Cookie.get('cart') ?? '[]');

				dispatch({
					type: '[Cart] - Load Cart from Cookies | storage',
					payload: cookieProducts
				});
			} catch (error) {
				dispatch({
					type: '[Cart] - Load Cart from Cookies | storage',
					payload: []
				});
			}
		}

		setIsMounted(true);
	}, [isMounted]);

	// Ya que el componente esta montado almacenamos los cambios de carrito en las cookies
	useEffect(() => {
		if (isMounted) {
			Cookie.set('cart', JSON.stringify(state.cart));
		}
	}, [state.cart, isMounted]);

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
