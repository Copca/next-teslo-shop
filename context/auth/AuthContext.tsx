import { createContext } from 'react';

import { IUser } from '../../interfaces';

interface ContextProps {
	// State
	isLoggedin: boolean;
	user?: IUser;

	// Metodos
}

export const AuthContext = createContext({} as ContextProps);
