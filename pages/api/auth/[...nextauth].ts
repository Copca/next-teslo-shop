import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';

import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

import { dbUser } from '../../../database';

export const authOptions: NextAuthOptions = {
	// Se renderizan en el orden que son declarados
	providers: [
		// ...add more providers here
		Credentials({
			name: 'Custom Login',
			credentials: {
				email: {
					label: 'Correo:',
					type: 'email',
					placeholder: 'correo@correo.com'
				},
				password: {
					label: 'Contraseña:',
					type: 'password',
					placeholder: 'Contraseña'
				}
			},
			async authorize(credentials) {
				// Validar DB .- Debemos retornar null o un arreglo con los datos el usuario
				// Si son validas las credenciales envia la informacion a user = {_id, email, role, name }
				return await dbUser.checkUserEmailPassword(
					credentials!.email,
					credentials!.password
				);
			}
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!
		})
	],
	// Custom Pages
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/register'
	},
	session: {
		strategy: 'jwt',
		maxAge: 2592000, // 2592000seg = 30 días duración se la sesión
		updateAge: 86400 // 86400seg = 24 hrs cada cuanto se actualiza la sesión
	},
	// Callbacks
	callbacks: {
		async jwt({ token, account, user }) {
			// En user tendremos la información enviado en authorize() => user = {_id, email, role, name }
			// Agregamos propiedades al token
			if (account) {
				token.accessToken = account.access_token;

				switch (account.type) {
					case 'credentials':
						token.user = user;
						break;

					case 'oauth':
						// Busca o guarda en DB el usuario logeado con un Provider (gitHub)
						token.user = await dbUser.oAuthToDbUser(
							user?.email || '',
							user?.name || ''
						);
						break;
				}
			}

			// En esta parte el token ya contiene datos del usuario {_id, email, role, name }
			return token;
		},
		async session({ session, token, user }) {
			// Cabiamos la información por default de session.user por token.user = {_id, email, role, name }
			session.accessToken = token.accessToken as string;
			session.user = token.user as any;

			return session;
		}
	}
};

export default NextAuth(authOptions);
