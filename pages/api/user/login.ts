import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '../../../database';
import { IUser } from '../../../interfaces';
import { User } from '../../../models';

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
		const { role, name } = user;

		return res.status(200).json({
			token: '', // jwt
			user: { email, name, role }
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Revise logs del servidor' });
	}
};
