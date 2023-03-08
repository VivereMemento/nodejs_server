import { ROLES_LIST } from '../config/roles_list';

export type User = {
	email: string;
	password: string;
	roles: {
		User: typeof ROLES_LIST.User;
		Admin?: typeof ROLES_LIST.Admin;
		Editor?: typeof ROLES_LIST.Editor;
	};
	refreshToken?: string;
};

export type Users = ReadonlyArray<User>;

export const usersDB: {
	users: Users;
	setUsers(data: Users): void;
} = {
	users: require('../model/users.json'),
	setUsers: function (data) {
		this.users = data;
	},
};
