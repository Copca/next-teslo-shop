import type { NextApiRequest, NextApiResponse } from 'next';

import { db, SHOP_CONSTANTS } from '../../../database';
import { Product } from '../../../models';

import { IProduct } from '../../../interfaces';

type Data = { message: string } | IProduct[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getProducts(req, res);

		default:
			return res.status(400).json({ message: 'Bad Request' });
	}
}

/**
 * Consultas a la DB
 */

// GET /api/products?gender=kid
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { gender = 'all' } = req.query;
	let condition = {};

	// Si el genero no es valido regreso todos los productos
	if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
		condition = { gender };
	}

	try {
		await db.connect();
		const products = await Product.find(condition)
			.select('title images price inStock slug -_id')
			.lean();
		await db.disconnect();

		// Retorna la imagen guardada en Cloudinary o la del FileSystem
		const updatedProducts = products.map((product) => {
			product.images = product.images.map((img) => {
				return img.includes('https')
					? img
					: `${process.env.HOST_NAME}products/${img}`;
			});

			return product;
		});

		return res.status(200).json(updatedProducts);
	} catch (error) {
		console.log(error);

		return res.status(500).json({ message: 'Revise logs del servidor' });
	}
};
