import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';

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
			return loginUser(req, res);

		default:
			return res.status(400).json({ message: 'Bad Request' });
	}
}

/**
 * Métodos
 */

// POST /api/user/login
const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { email = '', password = '' } = req.body;

	try {
		await db.connect();
		const user = await User.findOne({ email });
		await db.disconnect();

		// Verificamos que el usuario existe en DB
		if (!user) {
			const { message } = new Error('Usuario o contraseña no válidos');
			return res.status(400).json({ message });
		}

		// Revisamos contraseña
		if (!bcrypt.compareSync(password, user.password!)) {
			const { message } = new Error('Usuario o contraseña no válidos');
			return res.status(400).json({ message });
		}

		// Seleccionamos la información que se enviará al Front End
		const { role, name, _id } = user;

		// Genero el JWT
		const token = jwt.signToken(_id, email);

		return res.status(200).json({
			token, // jwt
			user: { email, name, role }
		});
	} catch (error) {
		console.log(error);
		// const { message = 'Revise logs del servidor' } = error as { message: string };

		return res.status(500).json({ message: 'Revise logs del servidor' });
	}
};
