import type { NextApiRequest, NextApiResponse } from 'next';

import { isValidObjectId } from 'mongoose';
import { db } from '../../../database';
import { IUser } from '../../../interfaces';
import { User } from '../../../models';

type Data = { message: string } | IUser[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getUsers(req, res);

		case 'PUT':
			return updateUser(req, res);

		default:
			return res.status(400).json({ message: 'Bad Request' });
	}
}

/**
 * Métodos
 */

// GET /api/admin/users
const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		await db.connect();
		const users = await User.find().select('-password').lean();
		await db.disconnect();

		return res.status(200).json(users);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Revise logs del servidor' });
	}
};

// PUT /api/admin/users
const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { userId = '', role = '' } = req.body;

	if (!isValidObjectId(userId)) {
		const { message } = new Error('No existe usuario por ese ID');
		return res.status(400).json({ message });
	}

	const validRoles = ['admin', 'client', 'super-user', 'seo'];

	if (!validRoles.includes(role)) {
		const { message } = new Error(
			`El role: ${role}, no es permitido. Roles válidos: ${validRoles.join(', ')} `
		);
		return res.status(400).json({ message });
	}

	try {
		await db.connect();
		const user = await User.findById(userId);

		if (!user) {
			await db.disconnect();
			const { message } = new Error('Usuario no encontrado');
			return res.status(401).json({ message });
		}

		// Actualizamos el rol de usuario
		user.role = role;
		await user.save();
		await db.disconnect();

		return res.status(200).json({ message: 'Usuario actualizado' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Revise logs del servidor' });
	}
};
