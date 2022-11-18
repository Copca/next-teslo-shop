import { FC, PropsWithChildren, useReducer } from 'react';

import { AuthContext, authReducer } from './';
import { IUser } from '../../interfaces';

export interface AuthState {
	isLoggedin: boolean;
	user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
	isLoggedin: false,
	user: undefined
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

	return (
		<AuthContext.Provider
			value={{
				// State
				...state

				// Metodos
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
