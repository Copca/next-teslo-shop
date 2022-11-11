import { createContext } from 'react';

interface ContextProps {
	// State
	isInputSearchOpen: boolean;

	// Metodos
	openInputSearch: () => void;
	closeInputSearch: () => void;
}

export const UiContext = createContext({} as ContextProps);
