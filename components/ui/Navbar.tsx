import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiSearchAlt2 } from 'react-icons/bi';
import { CartBtn } from './CartBtn';

export const Navbar = () => {
	const router = useRouter();

	return (
		<div className='shadow mb-8'>
			<nav className='container flex items-center justify-between py-5'>
				<Link href='/' className='flex items-center font-bold'>
					<h6>Teslo</h6>
					<p className='ml-1'>| Shop</p>
				</Link>

				<div className='hidden sm:flex items-center gap-4 '>
					<Link
						href={`/category/men`}
						className={`btn hover:bg-slate-800 text-slate-800 hover:text-white shadow ${
							router.pathname === `/category/men` &&
							'bg-slate-700 text-white'
						}`}
						data-mdb-ripple='true'
						data-mdb-ripple-color='light'
					>
						Hombres
					</Link>

					<Link
						href={`/category/women`}
						className={`btn hover:bg-slate-800 text-slate-800 hover:text-white shadow ${
							router.pathname === `/category/women` &&
							'bg-slate-700 text-white'
						}`}
						data-mdb-ripple='true'
						data-mdb-ripple-color='light'
					>
						Mujeres
					</Link>

					<Link
						href={`/category/kids`}
						className={`btn hover:bg-slate-800 text-slate-800 hover:text-white shadow ${
							router.pathname === `/category/kids` &&
							'bg-slate-700 text-white'
						}`}
						data-mdb-ripple='true'
						data-mdb-ripple-color='light'
					>
						Niños
					</Link>
				</div>

				<div className='flex items-center gap-8'>
					<button>
						<BiSearchAlt2 className='text-2xl' />
					</button>

					<Link href={'/cart'}>
						<CartBtn />
					</Link>

					<button
						data-bs-toggle='offcanvas'
						data-bs-target='#offcanvasRight'
						aria-controls='offcanvasRight'
						className='outline-none'
					>
						Menú
					</button>
				</div>
			</nav>
		</div>
	);
};
