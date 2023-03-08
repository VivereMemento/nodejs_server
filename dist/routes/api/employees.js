"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeesController_1 = require("../../controllers/employeesController");
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const router = express_1.default.Router();
router.route('/').get(employeesController_1.getAllEmployees).post(employeesController_1.createNewEmployee);
// 	verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
// 	updateEmployee
// )
// .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);
// router.route('/:id').get(employeesController.getEmployee);
exports.default = router;
