import jwt from 'jsonwebtoken';

// Genera un JWT con _id e email
export const signToken = (_id: string, email: string) => {
	if (!process.env.JWT_SECRET_SEED) {
		throw new Error('No hay semilla de JWT - Revisar variables de entorno');
	}

	return jwt.sign(
		// payload
		{ _id, email },
		// seed
		process.env.JWT_SECRET_SEED,
		// Opciones
		{ expiresIn: '30d' }
	);
};

// Si el token es válido regresa el _id del usuario
export const isValidToken = (token: string): Promise<string> => {
	if (!process.env.JWT_SECRET_SEED) {
		throw new Error('No hay semilla de JWT - Revisar variables de entorno');
	}

	if (token.length <= 10) {
		return Promise.reject(new Error('JWT no válido'));
	}

	return new Promise((resolve, reject) => {
		try {
			jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
				if (err) return reject(new Error('JWT no válido'));

				const { _id } = payload as { _id: string };
				resolve(_id);
			});
		} catch (error) {
			return reject(new Error('JWT no válido'));
		}
	});
};
