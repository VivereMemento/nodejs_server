import { Request, RequestHandler, Response } from 'express';
import EmployeeModel from '../model/Employee';
import { Employee } from '../model/employees';

export const getAllEmployees = async (_: Request, res: Response) => {
	const employees = await EmployeeModel.find();
	if (!employees) return res.status(204);
	res.json(employees);
};

export const createNewEmployee = async (
	req: Request<never, never, Employee>,
	res: Response
) => {
	const { body } = req;
	const {
		email,
		firstName,
		lastName,
		companyName,
		companyCode,
		documentTypes,
		role,
	} = body;

	if (!email || !firstName || !lastName) {
		return res
			.status(400)
			.json({ message: 'First and last names are required' });
	}

	// check for duplicate email in the db
	const duplicate = await EmployeeModel.findOne({ email }).exec();
	if (duplicate) return res.sendStatus(409); //Conflict

	try {
		const result = await EmployeeModel.create({
			email,
			firstName,
			lastName,
			companyName,
			companyCode,
			documentTypes,
			role,
		});

		res.status(201).json(result);
	} catch (err) {
		console.error(err);
	}
};

// const updateEmployee = (req, res) => {
// 	const employee = employeesDB.employees.find(emp => emp.id === parseInt(req.body.id));
// 	if (!employee) {
// 		return res
// 			.status(400)
// 			.json({ message: `Employee ID ${req.body.id} not found` });
// 	}
// 	if (req.body.firstname) employee.firstname = req.body.firstname;
// 	if (req.body.lastname) employee.lastname = req.body.lastname;
// 	const filteredArray = employeesDB.employees.filter(
// 		emp => emp.id !== parseInt(req.body.id)
// 	);
// 	const unsortedArray = [...filteredArray, employee];
// 	employeesDB.setEmployees(
// 		unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
// 	);
// 	res.json(employeesDB.employees);
// };

// const deleteEmployee = (req, res) => {
// 	const employee = employeesDB.employees.find(emp => emp.id === parseInt(req.body.id));
// 	if (!employee) {
// 		return res
// 			.status(400)
// 			.json({ message: `Employee ID ${req.body.id} not found` });
// 	}
// 	const filteredArray = employeesDB.employees.filter(
// 		emp => emp.id !== parseInt(req.body.id)
// 	);
// 	employeesDB.setEmployees([...filteredArray]);
// 	res.json(employeesDB.employees);
// };

// const getEmployee = (req, res) => {
// 	const employee = employeesDB.employees.find(
// 		emp => emp.id === parseInt(req.params.id)
// 	);
// 	if (!employee) {
// 		return res
// 			.status(400)
// 			.json({ message: `Employee ID ${req.params.id} not found` });
// 	}
// 	res.json(employee);
// };
