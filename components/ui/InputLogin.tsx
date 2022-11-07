import { FC } from 'react';

interface Props {
	type?: InputType;
	labelText?: string;
	className?: string;
}

type InputType = 'text' | 'email' | 'file' | 'number' | 'tel' | 'text' | 'password';

export const InputLogin: FC<Props> = ({
	type = 'text',
	labelText = 'nombre',
	className = ''
}) => {
	return (
		<div className={`relative ${className}`}>
			<input
				type={type}
				placeholder=' '
				className='w-full border focus:border-sky-500 rounded-md outline-none  py-2 px-3 peer'
			/>
			<div></div>
			<label className='absolute bg-white -top-3 left-2 scale-75 px-1 transition-all peer-placeholder-shown:scale-100 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-2 peer-placeholder-shown:text-slate-500 peer-focus:-top-3 peer-focus-within:left-2 peer-focus:scale-75 peer-focus:text-sky-500'>
				{labelText}
			</label>
		</div>
	);
};
