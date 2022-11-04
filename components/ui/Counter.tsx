import { FC } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

interface Props {}

export const Counter: FC<Props> = () => {
	return (
		<div>
			<p className='mb-1'>Cantidad: </p>

			<div className='flex items-center space-x-4 mb-8'>
				<button>
					<AiOutlineMinusCircle className='text-2xl' />
				</button>

				<p>1</p>

				<button>
					<AiOutlinePlusCircle className='text-2xl' />
				</button>
			</div>
		</div>
	);
};
