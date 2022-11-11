import { useState, KeyboardEvent, useRef, FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { BiSearch, BiX } from 'react-icons/bi';

import { UiContext } from '../../context/ui/';

interface Props {
	className?: string;
	icon?: 'search' | 'close';
	color?: 'light' | 'dark';
}

export const InputSearch: FC<Props> = ({ className, icon, color }) => {
	const { closeInputSearch } = useContext(UiContext);
	const refBtn = useRef<HTMLButtonElement>(null);
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState('');

	// Redireciona con el término de búsqueda
	const navigate = () => {
		if (searchTerm.length !== 0) {
			// Simulamos el click del boton oculto
			refBtn.current!.click();

			// Reseteamos el searchTerm
			setSearchTerm('');
			// cerramos el inputSearch
			closeInputSearch();

			router.push(`/search/${searchTerm}`);
		}
	};

	// Redireccionamiento con la tecla enter
	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			navigate();
		}
	};

	// Redireccionamiento con click en el icono search
	const handleSearch = () => {
		navigate();
	};

	return (
		<div
			className={`flex justify-center border-b relative animate-fadeIn ${
				color === 'light' ? 'border-white' : 'border-slate-200'
			} ${className}`}
		>
			{/* Boton oculto para cerrar el menu */}
			<button
				type='button'
				ref={refBtn}
				data-bs-dismiss='offcanvas'
				className='hidden'
			>
				X
			</button>

			<input
				type='text'
				placeholder='Buscar...'
				className={`w-full bg-transparent outline-none px-3 peer ${
					color === 'light'
						? 'text-white placeholder:text-slate-200'
						: 'text-slate-800 placeholder:text-slate-400'
				}`}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onKeyDown={handleKeyDown}
			/>

			{icon === 'search' ? (
				<BiSearch
					className={`text-2xl cursor-pointer ${
						color === 'light' ? 'text-white' : 'text-slate-800'
					}`}
					onClick={handleSearch}
				/>
			) : (
				<BiX
					className={`text-2xl cursor-pointer ${
						color === 'light' ? 'text-white' : 'text-slate-800'
					}`}
					onClick={closeInputSearch}
				/>
			)}

			{/* Animación del borde en el input */}
			<div
				className={`absolute top-full transition-all duration-300  w-0 h-0.5 peer-focus:w-full ${
					color === 'light' ? 'bg-slate-400' : 'bg-black'
				}`}
			></div>
		</div>
	);
};
