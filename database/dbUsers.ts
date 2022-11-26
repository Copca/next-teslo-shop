import bcrypt from 'bcryptjs';

import { db } from '.';
import { User } from '../models';

export const checkUserEmailPassword = async (email: string, password: string) => {
	await db.connect();
	const user = await User.findOne({ email });
	await db.disconnect();

	if (!user) {
		return null;
	}

	if (!bcrypt.compareSync(password, user.password!)) {
		return null;
	}

	const { _id, name, role } = user;

	return {
		_id,
		email: email.toLowerCase(),
		role,
		name
	};
};

// Esta función crea o verifica el usuario de OAuth
export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
	await db.connect();
	const user = await User.findOne({ email: oAuthEmail });

	// Si el usuario ya esta creado con credentials
	if (user) {
		await db.disconnect();
		const { _id, email, role, name } = user;

		return { _id, email, role, name };
	}

	// Si se esta logeando con algun Provider (gitHub)
	const newUser = new User({
		email: oAuthEmail,
		name: oAuthName,
		password: '@',
		role: 'client'
	});
	await newUser.save();
	await db.disconnect();

	const { _id, email, role, name } = newUser;

	return { _id, email, role, name };
};
