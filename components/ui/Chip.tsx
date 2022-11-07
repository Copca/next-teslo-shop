import { FC } from 'react';
import { MdCreditScore, MdOutlineCreditCardOff } from 'react-icons/md';

interface Props {
	pagado?: boolean;
}

export const Chip: FC<Props> = ({ pagado = false }) => {
	return (
		<>
			{pagado ? (
				<div className='inline-flex items-center text-green-500 font-bold border-2 border-green-500 rounded-full px-3 py-2 space-x-3'>
					<MdCreditScore className='text-xl' />
					<p>Pagado</p>
				</div>
			) : (
				<div className='inline-flex items-center text-red-500 font-bold border-2 border-red-500 rounded-full px-3 py-2 space-x-3'>
					<MdOutlineCreditCardOff className='text-xl' />
					<p>Pendiente de Pago</p>
				</div>
			)}
		</>
	);
};
