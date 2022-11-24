import { FC, PropsWithChildren, useEffect, useReducer, useRef, useState } from 'react';
import Cookies from 'js-cookie';

import { CartContext, cartReducer } from './';
import { ICartProduct } from '../../interfaces';

export interface CartState {
	isLoaded: boolean;
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;
}

const CART_INITIAL_STATE: CartState = {
	isLoaded: false,
	cart: [],
	numberOfItems: 0,
	subTotal: 0,
	tax: 0,
	total: 0
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
	const [isMounted, setIsMounted] = useState(false);

	// Obtenemos el carrito de las Cookies la primera vez que se carga el componente (primer renderizado)
	useEffect(() => {
		if (!isMounted) {
			// usando el trycatch prevenimos un error si modifican las cookies en en navegador
			try {
				const cookieProducts = JSON.parse(Cookies.get('cart') ?? '[]');

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
			Cookies.set('cart', JSON.stringify(state.cart));
		}
	}, [state.cart, isMounted]);

	// Calular el total de articulos en carrito y subtotal del costo
	useEffect(() => {
		// Cantidad de articulos
		const numberOfItems = state.cart.reduce(
			(prev, current) => current.quantity + prev,
			0
		);

		// Subtotal
		const subTotal = state.cart.reduce(
			(prev, current) => current.price * current.quantity + prev,
			0
		);

		// Impuestos 15%
		const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE!);

		const orderSummary = {
			numberOfItems,
			subTotal,
			tax: subTotal * taxRate,
			total: subTotal + subTotal * taxRate
		};

		dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
	}, [state.cart]);

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
			if (productState._id !== product._id) return productState;
			if (productState.size !== product.size) return productState;

			// Actualizar la cantidad
			productState.quantity += product.quantity;

			return productState;
		});

		dispatch({ type: '[Cart] - Update Products in Cart', payload: updatedProducts });
	};

	const updateCartQuantity = (product: ICartProduct) => {
		dispatch({ type: '[Cart] - Change Cart quantity', payload: product });
	};

	const removeCartProduct = (product: ICartProduct) => {
		dispatch({ type: '[Cart] - Remove product in cart', payload: product });
	};

	return (
		<CartContext.Provider
			value={{
				// State
				...state,

				// Metodos
				addProduct,
				updateCartQuantity,
				removeCartProduct
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
