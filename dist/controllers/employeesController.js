"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewEmployee = exports.getAllEmployees = void 0;
const Employee_1 = __importDefault(require("../model/Employee"));
const getAllEmployees = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield Employee_1.default.find();
    if (!employees)
        return res.status(204);
    res.json(employees);
});
exports.getAllEmployees = getAllEmployees;
const createNewEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { email, firstName, lastName, companyName, companyCode, documentTypes, role, } = body;
    if (!email || !firstName || !lastName) {
        return res
            .status(400)
            .json({ message: 'First and last names are required' });
    }
    // check for duplicate email in the db
    const duplicate = yield Employee_1.default.findOne({ email }).exec();
    if (duplicate)
        return res.sendStatus(409); //Conflict
    try {
        const result = yield Employee_1.default.create({
            email,
            firstName,
            lastName,
            companyName,
            companyCode,
            documentTypes,
            role,
        });
        res.status(201).json(result);
    }
    catch (err) {
        console.error(err);
    }
});
exports.createNewEmployee = createNewEmployee;
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
