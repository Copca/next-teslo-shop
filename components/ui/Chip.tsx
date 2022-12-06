import { FC } from 'react';
import { MdCreditScore, MdOutlineCreditCardOff } from 'react-icons/md';

interface Props {
	pagado?: boolean;
	className?: string;
}

export const Chip: FC<Props> = ({ pagado = false, className = '' }) => {
	return (
		<>
			{pagado ? (
				<div
					className={`inline-flex justify-center items-center text-green-500 font-bold border-2 border-green-500 rounded-full px-3 py-2 space-x-3 ${className}`}
				>
					<MdCreditScore className='text-xl' />
					<p>Pagado</p>
				</div>
			) : (
				<div
					className={`inline-flex justify-center items-center text-red-500 font-bold border-2 border-red-500 rounded-full px-3 py-2 space-x-3 ${className}`}
				>
					<MdOutlineCreditCardOff className='text-xl' />
					<p>Pendiente de Pago</p>
				</div>
			)}
		</>
	);
};
