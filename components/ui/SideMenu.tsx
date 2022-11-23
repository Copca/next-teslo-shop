import { useContext } from 'react';
import Link from 'next/link';

import { BiUserCircle, BiX, BiExit, BiLogIn } from 'react-icons/bi';
import { TiTicket } from 'react-icons/ti';
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai';
import { FaChild, FaUsers } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';
import { GiClothes } from 'react-icons/gi';

import { AuthContext } from '../../context';

import { InputSearch } from './InputSearch';

export const SideMenu = () => {
	const { isLoggedIn, user } = useContext(AuthContext);

	return (
		<>
			<div
				className='offcanvas offcanvas-end fixed bottom-0 flex flex-col max-w-full bg-slate-700 invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-white top-0 right-0 border-none w-80'
				tabIndex={-1}
				id='offcanvasRight'
				aria-labelledby='offcanvasRightLabel'
			>
				<div className='offcanvas-header flex items-center justify-end'>
					<button
						type='button'
						className='text-white text-2xl hover:opacity-75 p-2'
						data-bs-dismiss='offcanvas'
						aria-label='Close'
					>
						<BiX />
					</button>
				</div>

				<div className='offcanvas-body flex-grow overflow-y-auto p-8'>
					<InputSearch icon='search' color='light' />

					<div className='mt-12'>
						<nav className='space-y-6'>
							{isLoggedIn && (
								<>
									<Link
										href='#'
										className='flex items-center gap-2 hover:text-slate-300 transition-colors'
									>
										<BiUserCircle className='text-2xl' />
										Perfil
									</Link>

									<Link
										href='#'
										className='flex items-center gap-2 hover:text-slate-300 transition-colors'
									>
										<TiTicket className='text-2xl' />
										Mis ordenes
									</Link>
								</>
							)}

							<Link
								href='/category/men'
								className='flex items-center gap-2 hover:text-slate-300 transition-colors'
							>
								<AiOutlineMan className='text-2xl' />
								Hombres
							</Link>

							<Link
								href='/category/women'
								className='flex items-center gap-2 hover:text-slate-300 transition-colors'
							>
								<AiOutlineWoman className='text-2xl' />
								Mujeres
							</Link>

							<Link
								href='/category/kids'
								className='flex items-center gap-2 hover:text-slate-300 transition-colors'
							>
								<FaChild className='text-2xl' />
								Niños
							</Link>

							{isLoggedIn ? (
								<Link
									href='#'
									className='flex items-center gap-2 hover:text-slate-300 transition-colors'
								>
									<BiExit className='text-2xl' />
									Salir
								</Link>
							) : (
								<Link
									href='/auth/login'
									className='flex items-center gap-2 hover:text-slate-300 transition-colors'
								>
									<BiLogIn className='text-2xl' />
									Login
								</Link>
							)}
						</nav>

						{/* Admin Panel */}
						{user?.role === 'admin' && (
							<nav className='space-y-4 border-t border-t-slate-400 mt-8 py-4'>
								<h6 className='text-xl'>Admin Panel</h6>

								<Link
									href='#'
									className='flex items-center gap-2 hover:text-slate-300 transition-colors'
								>
									<MdOutlineDashboard className='text-2xl' />
									Dashboard
								</Link>

								<Link
									href='#'
									className='flex items-center gap-2 hover:text-slate-300 transition-colors'
								>
									<GiClothes className='text-2xl' />
									Productos
								</Link>

								<Link
									href='#'
									className='flex items-center gap-2 hover:text-slate-300 transition-colors'
								>
									<TiTicket className='text-2xl' />
									Ordenes
								</Link>

								<Link
									href='#'
									className='flex items-center gap-2 hover:text-slate-300 transition-colors'
								>
									<FaUsers className='text-2xl' />
									Usuarios
								</Link>
							</nav>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
