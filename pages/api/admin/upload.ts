import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';

// nos autenticamos en cloudinary
cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = { message: string };

// Configuración de Next para evitar la serialización del body-parser
export const config = {
	api: {
		bodyParser: false
	}
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return uploadFile(req, res);

		default:
			return res.status(400).json({ message: 'Bad Request' });
	}
}

/**
 * Métodos
 */

// Guardar el archivo en FileSystem (Se recomuenda usar un servicio para alojar imagenes ej. cloudinary)
const saveFile = async (file: formidable.File): Promise<string> => {
	// const data = fs.readFileSync(file.filepath); // Creamos un archivo temporal
	// fs.writeFileSync(`./public/${file.originalFilename}`, data); // Movemos el archivo temporal a la carpeta publica
	// fs.unlinkSync(file.filepath); // Borramos el archivo temporal
	// return;

	// Subir la imagen a cloudinary
	const { secure_url } = await cloudinary.uploader.upload(file.filepath);

	return secure_url;
};

const parseFiles = async (req: NextApiRequest): Promise<string> => {
	return new Promise((resolve, reject) => {
		const form = new formidable.IncomingForm();

		form.parse(req, async (err, fields, files) => {
			// console.log({ err, fields, files });

			if (err) {
				return reject(err);
			}

			const filePath = await saveFile(files.file as formidable.File);

			resolve(filePath);
		});
	});
};

// POST /api/admin/upload
const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	// recibimos en el request el FormData con las imagenes
	const imageUrl = await parseFiles(req);

	return res.status(200).json({ message: imageUrl });
};
