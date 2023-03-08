"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersDB = void 0;
exports.usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users = data;
    },
};
