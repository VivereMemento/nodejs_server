import mongoose, { Schema, Types } from 'mongoose';
import { ROLES_LIST } from '../config/roles_list';
import { User } from './usersDB';

const employeeSchema = new Schema<User>({
	email: { type: String, required: true },
	password: { type: String, required: true },
	roles: {
		User: { type: Number, default: ROLES_LIST.User, required: true },
		Admin: { type: Number, required: false },
		Editor: { type: Number, required: false },
	},
	refreshToken: { type: String, required: false },
});

export default mongoose.model('User', employeeSchema);
