import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import { Product } from '../../../models';

import { IProduct } from '../../../interfaces';

type Data = { message: string } | IProduct[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return searchProducts(req, res);

		default:
			return res.status(400).json({ message: 'Bad Request' });
	}
}

/**
 * Consultas a la DB
 */

// GET /api/search/[q]
const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	let { q = '' } = req.query;

	q = q.toString().toLowerCase();

	try {
		await db.connect();
		const products = await Product.find({
			$text: { $search: q }
		})
			.select('title images price inStock slug -_id')
			.lean();
		await db.disconnect();

		if (!products.length) {
			return res
				.status(401)
				.json({ message: 'Intente con otro término de búsqueda' });
		}

		return res.status(200).json(products);
	} catch (error) {
		console.log(error);

		return res.status(500).json({ message: 'Revise logs del servidor' });
	}
};
