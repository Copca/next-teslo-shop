import { FC, PropsWithChildren, useReducer } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { AuthContext, authReducer } from './';
import clienteAxios from '../../axios/axios';
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

	const loginUser = async (email: string, password: string): Promise<boolean> => {
		try {
			const { data } = await clienteAxios.post('/user/login', { email, password });
			const { token, user } = data;

			// Guardamos el token en Cookies
			Cookies.set('token', token);

			dispatch({ type: '[Auth] - Login', payload: user });
			return true;
		} catch (error) {
			return false;
		}
	};

	const registerUser = async (
		name: string,
		email: string,
		password: string
	): Promise<{ hasError: boolean; message?: string }> => {
		// tipado en linea, lo ideal es hacer la interfaz
		try {
			const { data } = await clienteAxios.post('/user/register', {
				name,
				email,
				password
			});
			const { token, user } = data;

			// Guardamos el token en Cookies
			Cookies.set('token', token);
			dispatch({ type: '[Auth] - Login', payload: user });

			return {
				hasError: false
			};
		} catch (error) {
			console.log(error);

			if (axios.isAxiosError(error)) {
				return {
					hasError: true,
					message: error.response?.data
				};
			}

			return {
				hasError: true,
				message: 'No se puedo crear el usuario, intente de nuevo'
			};
		}
	};

	return (
		<AuthContext.Provider
			value={{
				// State
				...state,

				// Metodos
				loginUser,
				registerUser
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
