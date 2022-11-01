import Link from 'next/link';
import { BiSearchAlt2 } from 'react-icons/bi';
import { CartBtn } from './CartBtn';

const categories = ['men', 'women', 'kids'];

export const Navbar = () => {
	return (
		<nav className='container flex items-center justify-between py-5 mb-8'>
			<Link href='/' className='flex items-center font-bold'>
				<h6>Teslo</h6>
				<p className='ml-1'>| Shop</p>
			</Link>

			<div className='hidden sm:flex items-center gap-4 '>
				{categories.map((category) => (
					<Link
						key={category}
						href={`/category/${category}`}
						className='btn hover:bg-slate-800 text-slate-800 hover:text-white shadow'
						data-mdb-ripple='true'
						data-mdb-ripple-color='light'
					>
						{category}
					</Link>
				))}
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
				>
					Menú
				</button>
			</div>
		</nav>
	);
};
