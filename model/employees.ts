import { Types } from 'mongoose';
export type Employee = {
	id: Types.ObjectId;
	email: string;
	firstName: string;
	lastName: string;
	companyName: string;
	companyCode: string;
	documentTypes: number[];
	role: string;
	status?: number;
};

export type Employees = ReadonlyArray<Employee>;

export const employeesDB = {
	employees: require('../model/employees.json'),
	setEmployees: function (data: Employees) {
		this.employees = data;
	},
};
