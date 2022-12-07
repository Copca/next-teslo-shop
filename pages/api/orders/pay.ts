import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { db } from '../../../database';
import { Order } from '../../../models';
import { IPaypalOrderResponse } from '../../../interfaces';

type Data = {
	message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return payOrder(req, res);

		default:
			return res.status(400).json({ message: 'Bad Request' });
	}
}

// Obtenemos el token de acceso a paypal desde el backend
const getPaypalBearerToken = async (): Promise<string | null> => {
	const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
	const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

	const base64Token = Buffer.from(
		`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
		'utf-8'
	).toString('base64');
	const body = new URLSearchParams('grant_type=client_credentials');

	try {
		// hacemos una petición a paypal oauth para obtener el token de acceso
		const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
			headers: {
				Authorization: `Basic ${base64Token}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});

		// retornamos el token de acceso
		return data.access_token;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error.response?.data);
		} else {
			console.log(error);
		}

		return null;
	}
};

/**
 * Métodos
 */

// POST /api/orders/pay  Obtenemos el token de paypal
const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	// TODO: Validar sessión de usuario
	// TODO: Validar mongoID

	// Obtenemos el token de acceso
	const paypalBearerToken = await getPaypalBearerToken();

	if (!paypalBearerToken) {
		const { message } = new Error('No se pudo confirmar el token de paypal');
		return res.status(400).json({ message });
	}

	const { transactionId = '', orderId = '' } = req.body;

	// Hacemos petición a paypal orders enviando el token de acceso para saber si se realizo el pago del transacrionId
	const { data } = await axios.get<IPaypalOrderResponse>(
		`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
		{
			headers: {
				Authorization: `Bearer ${paypalBearerToken}`
			}
		}
	);

	// Si no de realiza el pago
	if (data.status !== 'COMPLETED') {
		const { message } = new Error('Orden no reconocida');
		return res.status(401).json({ message });
	}

	// Si se realiza el pago correctamente
	await db.connect();
	const dbOrder = await Order.findById(orderId);

	if (!dbOrder) {
		await db.disconnect();

		const { message } = new Error('Orden no encontrada en la base de datos');
		return res.status(400).json({ message });
	}

	// Si los montos de nuesta DB no corresponden al de Paypal
	if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
		const { message } = new Error(
			'Los montos de paypal y nuestra orden no son iguales'
		);
		return res.status(400).json({ message });
	}

	// Si todo OK guardamos en DB el transactionId y el esttus de pago
	dbOrder.transactionId = transactionId;
	dbOrder.isPaid = true;
	await dbOrder.save();

	await db.disconnect();

	// Regresamos el token de paypal
	return res.status(200).json({ message: 'Orden Pagada' });
};
