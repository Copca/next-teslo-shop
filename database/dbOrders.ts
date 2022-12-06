import { isValidObjectId } from 'mongoose';

import { db } from '.';
import { Order } from '../models';
import { IOrder } from '../interfaces';

export const getOrderById = async (idOrder: string): Promise<IOrder | null> => {
	// Veriificamos que sea un ID de Mongo
	if (!isValidObjectId(idOrder)) {
		return null;
	}

	await db.connect();
	const order = await Order.findById(idOrder).lean();
	await db.disconnect();

	if (!order) {
		return null;
	}

	return JSON.parse(JSON.stringify(order));
};

export const getOrdersByUser = async (idUser: string): Promise<IOrder[]> => {
	// Veriificamos que sea un ID de Mongo
	if (!isValidObjectId(idUser)) {
		return [];
	}

	await db.connect();
	const orders = await Order.find({ user: idUser }).lean();
	await db.disconnect();

	return JSON.parse(JSON.stringify(orders));
};
