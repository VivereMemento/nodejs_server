import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../model/User';

import { ROLES_LIST } from '../config/roles_list';
import { User, usersDB } from '../model/usersDB';

type LoginResBody = {
	accessToken: string;
};

const ROLES_LIST_VALUES = Object.values(ROLES_LIST);

export type UserInfo = {
	UserInfo: { email: string; roles: typeof ROLES_LIST_VALUES };
};

export const handleLogin = async (
	req: Request<undefined, LoginResBody, User>,
	res: Response
) => {
	const { email, password } = req.body;
	console.log(req.body);
	if (!email || !password)
		return res
			.status(400)
			.json({ message: 'Email and password are required.' });
	const foundUser = await UserModel.findOne({ email }).exec();
	if (!foundUser) return res.sendStatus(401); //Unauthorized
	// evaluate password
	const match = await bcrypt.compare(password, foundUser.password);
	if (match) {
		// create JWTs
		const roles = Object.values(foundUser.roles);
		const accessToken = jwt.sign(
			{ UserInfo: { email: foundUser.email, roles: roles } } as UserInfo,
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '30s' }
		);
		const refreshToken = jwt.sign(
			{ email: foundUser.email },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '1d' }
		);
		// Saving refreshToken with current user
		foundUser.refreshToken = refreshToken;
		const result = await foundUser.save();

		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.json({ accessToken, roles });
	} else {
		res.sendStatus(401);
	}
};
