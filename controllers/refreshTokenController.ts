import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import UserModel from '../model/User';

export const handleRefreshToken = async (req: Request, res: Response) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;

	const foundUser = await UserModel.findOne({ refreshToken }).exec();

	if (!foundUser) return res.sendStatus(403); //Forbidden

	// evaluate jwt
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err: any, decoded: any) => {
			if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
			const roles = Object.values(foundUser.roles);
			const accessToken = jwt.sign(
				{
					UserInfo: {
						email: decoded.email,
						roles,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '30s' }
			);
			res.json({ accessToken, roles });
		}
	);
};
