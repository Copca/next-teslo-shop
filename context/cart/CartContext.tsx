import { createContext } from 'react';

import { ICartProduct, IProduct } from '../../interfaces';

interface ContextProps {
	// State
	cart: ICartProduct[];

	// Metodos
	addProduct: (product: ICartProduct) => void;
	updateCartQuantity: (product: ICartProduct) => void;
	removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
