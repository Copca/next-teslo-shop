import { createContext } from 'react';

import { ICartProduct, IShippingAddress } from '../../interfaces';

interface ContextProps {
	// State
	isLoaded: boolean;
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;

	shippingAddress?: IShippingAddress;

	// Metodos
	addProduct: (product: ICartProduct) => void;
	updateCartQuantity: (product: ICartProduct) => void;
	removeCartProduct: (product: ICartProduct) => void;
	updateShippingAddress: (address: IShippingAddress) => void;
	createOrder: () => Promise<{
		hasError: boolean;
		message: string;
	}>;
}

export const CartContext = createContext({} as ContextProps);
