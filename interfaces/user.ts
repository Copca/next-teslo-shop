export interface IUser {
	_id: string;
	name: string;
	email: string;
	password?: string;
	role: string;

	// Campos creados por MongoDB
	createdAt?: string;
	updatedAt?: string;
}
