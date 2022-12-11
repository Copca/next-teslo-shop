import Link from 'next/link';

export const AdminNavbar = () => {
	return (
		<div className='shadow mb-8 bg-slate-200'>
			<nav className='container flex items-center justify-between py-5'>
				<Link href='/' className='flex items-center font-bold'>
					<h6>Teslo</h6>
					<p className='ml-1'>| Shop</p>
				</Link>

				{/* La clase offcanvas se pone para evitar un error al cerra el sidemenu */}
				<button
					data-bs-toggle='offcanvas'
					data-bs-target='#offcanvasRight'
					aria-controls='offcanvasRight'
					className='outline-none'
				>
					Menú
				</button>
			</nav>
		</div>
	);
};
