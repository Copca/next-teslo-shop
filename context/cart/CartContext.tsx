import { createContext } from 'react';

import { ICartProduct } from '../../interfaces';
import { ShippingAddress } from './CartProvider';

interface ContextProps {
	// State
	isLoaded: boolean;
	cart: ICartProduct[];
	numberOfItems: number;
	subTotal: number;
	tax: number;
	total: number;

	shippingAddress?: ShippingAddress;

	// Metodos
	addProduct: (product: ICartProduct) => void;
	updateCartQuantity: (product: ICartProduct) => void;
	removeCartProduct: (product: ICartProduct) => void;
	updateShippingAddress: (address: ShippingAddress) => void;
}

export const CartContext = createContext({} as ContextProps);
