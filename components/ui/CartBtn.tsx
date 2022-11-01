import { BiCart } from 'react-icons/bi';

export const CartBtn = () => {
	return (
		<div className=' inline-flex relative w-fit'>
			<div className='absolute inline-block -top-0.5 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 text-xs text-center font-bold bg-blue-500 text-white rounded-full p-1.5 z-10'>
				+9
			</div>
			<div>
				<BiCart className='text-2xl' />
			</div>
		</div>
	);
};
