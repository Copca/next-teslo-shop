import { createContext } from 'react';

import { IUser } from '../../interfaces';

interface ContextProps {
	// State
	isLoggedin: boolean;
	user?: IUser;

	// Metodos
	loginUser: (email: string, password: string) => Promise<boolean>;
	registerUser: (
		name: string,
		email: string,
		password: string
	) => Promise<{
		hasError: boolean;
		message?: string;
	}>;
}

export const AuthContext = createContext({} as ContextProps);