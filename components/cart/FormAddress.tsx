import { ContInputAnim, SelectAnimated } from '../ui';

export const FormAddres = () => {
	return (
		<form>
			<div className='max-w-5xl grid md:grid-cols-2 gap-3 mx-auto'>
				<ContInputAnim label='Nombre'>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
					/>
				</ContInputAnim>

				<ContInputAnim label='Apellido'>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
					/>
				</ContInputAnim>

				<ContInputAnim label='Dirección'>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
					/>
				</ContInputAnim>

				<ContInputAnim label='Dirección 2'>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
					/>
				</ContInputAnim>

				<ContInputAnim label='Código Postal'>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
					/>
				</ContInputAnim>

				<ContInputAnim label='Ciudad'>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
					/>
				</ContInputAnim>

				<SelectAnimated />

				<ContInputAnim label='Télefono'>
					<input
						type='text'
						placeholder=' '
						className='w-full bg-transparent border border-transparent focus:border-transparent outline-none py-1 px-3 peer'
					/>
				</ContInputAnim>
			</div>

			<div className='flex justify-center'>
				<button className='btn bg-blue-500 hover:bg-blue-600 rounded-full mt-8'>
					Revisar Pedido
				</button>
			</div>
		</form>
	);
};
