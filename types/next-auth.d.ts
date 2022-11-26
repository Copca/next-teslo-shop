import NextAuth from 'next-auth';

// Extendemos la propiedad session.accessToken al callback session
declare module 'next-auth' {
	interface Session {
		accessToken?: string;
	}

	interface User {
		id?: string;
	}
}
