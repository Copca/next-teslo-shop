import type { NextApiRequest, NextApiResponse } from 'next';

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
		case 'GET':
			return checkJWT(req, res);

		default:
			return res.status(400).json({ message: 'Bad Request' });
	}
}

/**
 * Métodos
 */

// GET /api/user/validate-token
const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { token = '' } = req.cookies;
	let userId = '';

	try {
		// validamos el JWT enviado en las cookies (retorna el _id del usuario)
		userId = await jwt.isValidToken(token);

		await db.connect();
		const user = await User.findById(userId).lean();
		await db.disconnect();

		if (!user) {
			const { message } = new Error('Usuario no encontrado');
			return res.status(400).json({ message });
		}

		const { _id, email, name, role } = user;

		return res.status(200).json({
			token: jwt.signToken(_id, email), // genero un nuevo JWT
			user: {
				email,
				name,
				role
			}
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Revise logs del servidor' });
	}
};
