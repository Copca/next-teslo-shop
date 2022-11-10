import { useState, KeyboardEvent, useRef, LegacyRef } from 'react';
import { useRouter } from 'next/router';
import { BiSearch } from 'react-icons/bi';

export const InputSearch = () => {
	const refBtn = useRef<HTMLButtonElement>(null);
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState('');

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			// Simulamos el click del boton oculto
			refBtn.current!.click();
			// Reseteamos el searchTerm
			setSearchTerm('');

			router.push(`/search/${searchTerm}`);
		}
	};

	return (
		<div className='flex justify-center border-b border-white mb-12 relative'>
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
				className='w-full bg-transparent text-white placeholder:text-slate-200 outline-none px-3 peer'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<BiSearch className='text-white text-2xl' />
			<div className='absolute top-full transition-all duration-300 bg-slate-400 w-0 h-0.5 peer-focus:w-full'></div>
		</div>
	);
};
