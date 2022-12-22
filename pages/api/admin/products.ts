import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';

import { v2 as cloudinary } from 'cloudinary';

// nos autenticamos en cloudinary
cloudinary.config(process.env.CLOUDINARY_URL || '');

import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = { message: string } | IProduct[] | IProduct;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getProducts(req, res);

		case 'PUT':
			return updatedProduct(req, res);

		case 'POST':
			return createProduct(req, res);

		default:
			return res.status(400).json({ message: 'Bad Request' });
	}
}

/**
 * Métodos
 */

// GET /api/admin/products
const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		await db.connect();
		const products = await Product.find().sort({ title: 'asc' }).lean();
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

// PUT /api/admin/products
const updatedProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		const { _id = '', images = [] } = req.body as IProduct;

		if (!isValidObjectId(_id)) {
			const { message } = new Error('El ID del producto no es valido');
			return res.status(400).json({ message });
		}

		if (images.length < 2) {
			const { message } = new Error('Son necesarias al menos 2 imagenes');
			return res.status(400).json({ message });
		}

		// TODO: cambiar la URL localhost:3000/productos/imagen.jpg

		await db.connect();
		const product = await Product.findById(_id);

		if (!product) {
			await db.disconnect();
			const { message } = new Error('No existe un producto con ese ID');
			return res.status(400).json({ message });
		}

		// Eliminar las imagenes Cloudinary
		// https://res.cloudinary.com/dfgalpmit/image/upload/v1671569619/dapgamcftmcpvqrcivhv.webp
		product.images.forEach(async (img) => {
			if (!images.includes(img)) {
				// Extraemos de cloudinary_url el public_id

				const [fileId, extension] = img
					.substring(img.lastIndexOf('/') + 1)
					.split('.');

				console.log({ img, fileId, extension });

				await cloudinary.uploader.destroy(fileId);
			}
		});

		await product.update(req.body); // No regresa el producto actualizado, se debe recargar el FrontEnd
		await db.disconnect();

		return res.status(200).json(product);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Revise logs del servidor' });
	}
};

// POST /api/admin/products
const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { images = [] } = req.body as IProduct;

	if (images.length < 2) {
		const { message } = new Error('El producto necesita al menos 2 imagenes');
		return res.status(400).json({ message });
	}

	// TODO: cambiar la URL localhost:3000/productos/imagen.jpg

	try {
		await db.connect();

		const product = new Product(req.body);

		await product.save();
		await db.disconnect();

		return res.status(200).json(product);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Revise logs del servidor' });
	}
};
