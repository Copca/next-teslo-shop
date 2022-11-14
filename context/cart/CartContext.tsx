import { createContext } from 'react';

import { ICartProduct, IProduct } from '../../interfaces';

interface ContextProps {
	// State
	cart: ICartProduct[];

	// Metodos
	addProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
