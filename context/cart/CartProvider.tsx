import { FC, PropsWithChildren, useEffect, useReducer, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import { CartContext, cartReducer } from './';
import { ICartProduct, IOrder, IShippingAddress } from '../../interfaces';
import { clienteAxios } from '../../axios';

export interface CartState {
	isLoaded: boolean;
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;

	shippingAddress?: IShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
	isLoaded: false,
	cart: [],
	numberOfItems: 0,
	subTotal: 0,
	tax: 0,
	total: 0,
	shippingAddress: undefined
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
	const [isMounted, setIsMounted] = useState(false);

	// Guardamos en el State los productos almacenados en Cookies
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

	// Guardamos en el State los datos de ShippingAddress almacenados en Cookies
	useEffect(() => {
		if (Cookies.get('firstName')) {
			const address = {
				firstName: Cookies.get('firstName') ?? '',
				lastName: Cookies.get('lastName') ?? '',
				address: Cookies.get('address') ?? '',
				address2: Cookies.get('address2') ?? '',
				zip: Cookies.get('zip') ?? '',
				city: Cookies.get('city') ?? '',
				country: Cookies.get('country') ?? '',
				phone: Cookies.get('phone') ?? ''
			};

			dispatch({ type: '[Cart] - Load Address from Cookies', payload: address });
		}
	}, []);

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
		const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

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

	const updateShippingAddress = (address: IShippingAddress) => {
		Cookies.set('firstName', address.firstName);
		Cookies.set('lastName', address.lastName);
		Cookies.set('address', address.address);
		Cookies.set('address2', address.address2 || '');
		Cookies.set('zip', address.zip);
		Cookies.set('city', address.city);
		Cookies.set('country', address.country);
		Cookies.set('phone', address.phone);

		dispatch({ type: '[Cart] - Update ShippingAddress', payload: address });
	};

	const createOrder = async (): Promise<{ hasError: boolean; message: string }> => {
		if (!state.shippingAddress) {
			throw new Error('No hay dirección de entrega');
		}

		const body: IOrder = {
			// hacemos este map por que size es obligatorio state.cart:ICartProdict[] y en IOrder es opcional
			orderItems: state.cart.map((p) => ({
				...p,
				size: p.size!
			})),
			shippingAddress: state.shippingAddress,
			numberOfItems: state.numberOfItems,
			subTotal: state.subTotal,
			tax: state.tax,
			total: state.total,
			isPaid: false
		};

		try {
			const { data } = await clienteAxios.post<IOrder>('/orders', body);

			// Reseteamos el cart(cookies)
			dispatch({ type: '[Cart] - Order Complete' });

			// Si todo sale bien regreso en message el _id de la orden
			return {
				hasError: false,
				message: data._id!
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return {
					hasError: true,
					message: error.response?.data.message
				};
			}

			return {
				hasError: true,
				message: 'Error no controlado, hable con el administrador'
			};
		}
	};

	return (
		<CartContext.Provider
			value={{
				// State
				...state,

				// Metodos
				addProduct,
				updateCartQuantity,
				removeCartProduct,
				updateShippingAddress,
				createOrder
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
