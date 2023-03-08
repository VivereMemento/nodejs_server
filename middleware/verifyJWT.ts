import 'dotenv/config';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UserInfo } from '../controllers/authController';

type RequestWithUserInfo = Request & {
	email: string;
	roles: number[];
};

const verifyJWT = (
	req: RequestWithUserInfo,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;
	if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
	const token = authHeader.split(' ')[1];

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		const decodedUser = decoded as UserInfo;
		if (err) return res.sendStatus(403); //invalid token
		req.email = decodedUser?.UserInfo.email;
		req.roles = decodedUser?.UserInfo.roles;
		next();
	});
};

export default verifyJWT;
