import { Request, Response } from 'express';
import UserModel from '../model/User';

export const handleLogout = async (req: Request, res: Response) => {
	// On client, also delete the accessToken
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204); //No content
	const refreshToken = cookies.jwt;

	// Is refreshToken in db?
	const foundUser = await UserModel.findOne({ refreshToken }).exec();
	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
		return res.sendStatus(204);
	}

	// Delete refreshToken in db
	foundUser.refreshToken = '';
	const result = await foundUser.save();

	res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
	res.sendStatus(204);
};
