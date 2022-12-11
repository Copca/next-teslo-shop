/**
 * Si no tiene sesion se usuario(token), redirecciona al login
 * El código del middleware sólo se ejecutan en las rutas declaradas en el matcher
 */

import { NextResponse } from 'next/server';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';

export default withAuth(
	function middleware(req: NextRequestWithAuth) {
		if (
			req.nextUrl.pathname.startsWith('/admin') ||
			req.nextUrl.pathname.startsWith('/api/admin')
		) {
			const { role } = req.nextauth.token?.user as any;
			const validRoles = ['admin', 'super-user', 'seo'];

			if (!validRoles.includes(role)) {
				return NextResponse.redirect(new URL('/', req.nextUrl.origin));
			}
		}
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token
		}
	}
);

export const config = {
	matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*']
};

/**
 * See "Matching Paths"
 * 
 * 1. * is zero or more.
 * 2. ? is zero or one.
 * 3. + one or more.
 * 
matcher: [
	'/api/entries/:path*', // SI /api/entries, SI /api/entries/6357fcf9dc98064a1b0709ee
	'/api/entries/:path?', // SI /api/entries, SI /api/entries/6357fcf9dc98064a1b0709ee
	'/api/entries/:path+' // NO /api/entries, SI /api/entries/6357fcf9dc98064a1b0709ee
];
 */
