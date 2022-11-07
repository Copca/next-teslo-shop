import { FormEvent } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';

import { AuthLayout } from '../../components/layouts';
import { InputLogin } from '../../components/ui';

const LoginPage: NextPage = () => {
	const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<AuthLayout tittle={'Ingresar'}>
			<div className='container'>
				<div className='max-w-lg mx-auto bg-white border shadow rounded-md p-8'>
					<h1 className='text-2xl font-bold mb-8'>Iniciar Sesión</h1>

					<form onSubmit={onSubmitForm}>
						<InputLogin type='text' labelText='Nombre' className='mb-4' />
						<InputLogin
							type='password'
							labelText='Contraseña'
							className='mb-4'
						/>

						<button
							type='submit'
							className=' btn bg-sky-500 hover:bg-sky-600 w-full my-8'
							data-mdb-ripple='true'
							data-mdb-ripple-color='light'
						>
							Ingresar
						</button>

						<div className='flex justify-end'>
							<Link
								href={'/auth/register'}
								className='underline text-slate-500 hover:text-slate-700 transition-colors'
							>
								¿No tienes cuenta?
							</Link>
						</div>

						<hr className='my-4' />

						<div className='flex justify-center'>
							<button
								className='btn text-gray-800 hover:bg-gray-100 border border-gray-500 gap-2 w-full mt-8'
								data-mdb-ripple='true'
								data-mdb-ripple-color='dark'
							>
								<AiFillGithub className='text-lg' /> GitHub
							</button>
						</div>
					</form>
				</div>
			</div>
		</AuthLayout>
	);
};

export default LoginPage;
