import mongoose, { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

import { IUser } from '../interfaces';

const userSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true
		},
		password: { type: String, required: true },
		role: {
			type: String,
			enum: {
				values: ['admin', 'client', 'super-user', 'seo'],
				message: '{VALUE} no es un role válido',
				default: 'client',
				required: true
			}
		}
	},
	{
		timestamps: true
	}
);

// Método para hashear los passwords antes de ser guardado en la BD
userSchema.pre('save', async function (next) {
	// Si el password ya esta hasheaddo

	if (!this.isModified('password')) {
		return next(); // deten la ejecuación
	}

	// Si no esta hasheado
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;
	next();
});

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;
