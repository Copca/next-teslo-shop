import { createContext } from 'react';

import { IUser } from '../../interfaces';

interface ContextProps {
	// State
	isLoggedIn: boolean;
	user?: IUser;

	// Metodos
	// loginUser: (email: string, password: string) => Promise<boolean>;
	registerUser: (
		name: string,
		email: string,
		password: string
	) => Promise<{
		hasError: boolean;
		message?: string;
	}>;
	logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
