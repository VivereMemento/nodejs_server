import mongoose, { Schema, Types } from 'mongoose';
import { Employee } from './employees';

const employeeSchema = new Schema<Employee>({
	id: Types.ObjectId,
	email: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	companyName: {
		type: String,
		required: true,
	},
	companyCode: {
		type: String,
		required: true,
	},
	documentTypes: [Number],
	status: {
		type: Number,
		default: 1,
	},
	role: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Employee', employeeSchema);
