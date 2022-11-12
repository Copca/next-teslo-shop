import { createContext } from 'react';

import { ICartProduct } from '../../interfaces';

interface ContextProps {
	// State
	cart: ICartProduct[];

	// Metodos
}

export const CartContext = createContext({} as ContextProps);
