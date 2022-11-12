import { FC } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

interface Props {
	currentValue: number;
	maxValue: number;
	updatedQuantity: (value: number) => void;
}

export const Counter: FC<Props> = ({ currentValue, maxValue, updatedQuantity }) => {
	const onRestar = () => {
		if (currentValue > 1) {
			updatedQuantity(currentValue - 1);
		}
	};

	const onSumar = () => {
		if (currentValue < maxValue) {
			updatedQuantity(currentValue + 1);
		}
	};

	return (
		<div>
			<p className='mb-1'>Cantidad: </p>

			<div className='flex items-center space-x-4 mb-8'>
				<button onClick={onRestar}>
					<AiOutlineMinusCircle className='text-2xl' />
				</button>

				<p>{currentValue}</p>

				<button onClick={onSumar}>
					<AiOutlinePlusCircle className='text-2xl' />
				</button>
			</div>
		</div>
	);
};
