import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import { User } from '../../../models';
import { jwt, validation } from '../../../utils';

type Data =
	| { message: string }
	| {
			token: string;
			user: {
				email: string;
				name: string;
				role: string;
			};
	  };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return registerUser(req, res);

		default:
			return res.status(400).json({ message: 'Bad Request' });
	}
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const {
		email = '',
		password = '',
		name = ''
	} = req.body as { email: string; password: string; name: string };

	try {
		await db.connect();
		const user = await User.findOne({ email });

		// Revisamos si el usuario ya esta registrado
		if (user) {
			await db.disconnect();
			const { message } = new Error('Este usuario ya esta registrado');
			return res.status(400).json({ message });
		}

		if (password.length < 6) {
			const { message } = new Error('El password debe tener al menos 6 caracteres');
			return res.status(400).json({ message });
		}

		if (name.length < 2) {
			const { message } = new Error('El nombre debe tener al menos 2 caracteres');
			return res.status(400).json({ message });
		}

		// Validar email
		if (!validation.isValidEmail(email)) {
			const { message } = new Error('Ingresa una cuenta de correo válida');
			return res.status(400).json({ message });
		}

		// Registramos el nuevo usuario, por seguridad no se recomienda pasar el req.body para crear usuarios ya que podrian cambiar los datos por default (ek el role)
		const newUser = new User({
			email: email.toLowerCase(),
			password,
			name,
			role: 'client'
		});

		await newUser.save();

		// Generamos el Token
		const { _id, role } = newUser;
		const token = jwt.signToken(_id, email);

		return res.status(200).json({
			token,
			user: {
				email,
				role,
				name
			}
		});
	} catch (error) {
		console.log(error);
		// const { message = 'Revise logs del servidor' } = error as { message: string };

		return res.status(500).json({ message: 'Revise logs del servidor' });
	}
};
