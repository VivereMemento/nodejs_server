"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeesDB = void 0;
exports.employeesDB = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) {
        this.employees = data;
    },
};
