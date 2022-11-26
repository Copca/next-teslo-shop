export { default } from 'next-auth/middleware';

export const config = {
	matcher: ['/checkout/:path*']
};

// // This function can be marked `async` if using `await` inside
// export async function middleware(req: NextRequest) {
// 	const token = req.cookies.get('token')?.value ?? '';

// 	console.log({ token });
// }
