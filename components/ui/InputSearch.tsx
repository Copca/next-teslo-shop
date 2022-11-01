import { BiSearch } from 'react-icons/bi';

export const InputSearch = () => {
	return (
		<div className='flex justify-center border-b border-white mb-12 relative'>
			<input
				type='text'
				placeholder='Buscar...'
				className='w-full bg-transparent text-white placeholder:text-slate-200 outline-none px-3 peer'
			/>
			<BiSearch className='text-white text-2xl' />
			<div className='absolute top-full transition-all duration-300 bg-slate-400 w-0 h-0.5 peer-focus:w-full'></div>
		</div>
	);
};
