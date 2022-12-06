import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

import { db } from '../../../database';
import { Order, Product } from '../../../models';
import { IOrder } from '../../../interfaces';

type Data = { message: string } | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return createOrder(req, res);

		default:
			return res.status(400).json({ message: 'Bad Request' });
	}
}

/**
 * Métodos
 *  */

// POST /api/orders
const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const body = req.body;

	const { orderItems, total } = body as IOrder;

	// Verificar session de usuario
	const session = await unstable_getServerSession(req, res, authOptions);

	if (!session) {
		const { message } = new Error('Debe estar autenticado para hacer esto');
		return res.status(401).json({ message });
	}

	try {
		// Crear un arreglo con los productos del cliente
		const productsIds = orderItems.map((product) => product._id);

		await db.connect();
		const dbProducts = await Product.find({ _id: { $in: productsIds } });

		// Subtotal
		const subTotal = orderItems.reduce((prev, current) => {
			// Comparo los precios de los productos en la DB con los que se envian desde el FrontEnd (orderItems)
			const currentPrice = dbProducts.find(
				(prod) => prod.id === current._id
			)!.price;

			if (!currentPrice) {
				throw new Error('Verifique el carrito de nuevo, producto no existe');
			}

			// Calculamos el subtotal con el precio almacenado en DB
			return currentPrice * current.quantity + prev;
		}, 0);

		// Impuestos 15%
		const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

		const backendTotal = subTotal + subTotal * taxRate;

		// Nos aseguramos que los montos no fueron manipulados en el FrontEnd
		if (total !== backendTotal) {
			throw new Error('El total no cuadra con el monto');
		}

		// Si todo esta bien
		const userId = session.user?._id;
		const newOrder = new Order({ ...req.body, isPaid: false, user: userId });

		await newOrder.save();
		await db.disconnect();

		return res.status(201).json(newOrder);
	} catch (error: any) {
		await db.disconnect();

		if (error.name === 'Error') {
			return res.status(400).json({ message: error.message });
		} else {
			return res.status(500).json({ message: 'Revise logs del servidor' });
		}
	}
};
