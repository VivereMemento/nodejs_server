import express from 'express';
import {
	createNewEmployee,
	getAllEmployees,
} from '../../controllers/employeesController';
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

const router = express.Router();

router.route('/').get(getAllEmployees).post(createNewEmployee);
// 	verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
// 	updateEmployee
// )
// .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

// router.route('/:id').get(employeesController.getEmployee);

export default router;
