import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

import { dbUser } from '../../../database';

export default NextAuth({
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
				// Validar DB .- Devemos retornar null o un arreglo con los datos el usuario
				// Si son validas las credenciales envia la informacion a user
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
	// Callbacks
	callbacks: {
		async jwt({ token, account, user }) {
			// console.log('#### jwt ####');
			// console.log({ token, account, user });

			// Agregamos propiedades al token
			if (account) {
				token.accessToken = account.access_token;

				switch (account.type) {
					case 'credentials':
						token.user = user;
						break;

					case 'oauth':
						// TODO: Verificar si existe
						break;
				}
			}

			return token;
		},
		async session({ session, token, user }) {
			// console.log('#### sesion ####');
			// console.log({ session, token, user });
			session.accessToken = token.accessToken as string;
			session.user = token.user as any;

			return session;
		}
	}
});
