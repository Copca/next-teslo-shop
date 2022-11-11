import { FC, PropsWithChildren, useReducer } from 'react';

import { UiContext, uiReducer } from './';

export interface UiState {
	isInputSearchOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
	isInputSearchOpen: false
};

export const UiProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

	const openInputSearch = () => {
		console.log('abrir menu');

		dispatch({ type: '[Ui] - Open InputSearch' });
	};

	const closeInputSearch = () => {
		dispatch({ type: '[Ui] - Close InputSearch' });
	};

	return (
		<UiContext.Provider
			value={{
				// State
				...state,

				// Metodos
				openInputSearch,
				closeInputSearch
			}}
		>
			{children}
		</UiContext.Provider>
	);
};
