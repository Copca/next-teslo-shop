import { CartState } from './';
import { ICartProduct } from '../../interfaces';

type CartActionType =
	| { type: '[Cart] - Load Cart from Cookies | storage'; payload: ICartProduct[] }
	| { type: '[Cart] - Update Products in Cart'; payload: ICartProduct[] }
	| { type: '[Cart] - Change Cart quantity'; payload: ICartProduct }
	| { type: '[Cart] - Remove product in cart'; payload: ICartProduct }
	| {
			type: '[Cart] - Update order summary';
			payload: {
				numberOfItems: number;
				subTotal: number;
				tax: number;
				total: number;
			};
	  };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
	switch (action.type) {
		case '[Cart] - Load Cart from Cookies | storage':
			return {
				...state,
				cart: [...action.payload]
			};

		case '[Cart] - Update Products in Cart':
			return {
				...state,
				cart: [...action.payload]
			};

		case '[Cart] - Change Cart quantity':
			return {
				...state,
				cart: state.cart.map((productState) => {
					if (productState._id !== action.payload._id) return productState;
					if (productState.size !== action.payload.size) return productState;

					return action.payload;
				})
			};

		case '[Cart] - Remove product in cart':
			return {
				...state,
				cart: state.cart.filter(
					(productState) =>
						!(
							productState._id === action.payload._id &&
							productState.size === action.payload.size
						)
				)
			};

		case '[Cart] - Update order summary':
			return {
				...state,
				...action.payload
			};

		default:
			return state;
	}
};
