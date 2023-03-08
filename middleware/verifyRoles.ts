import { NextFunction, Request, Response } from 'express';

type RequestWithUserInfo = Request & {
	email: string;
	roles: number[];
};

const verifyRoles = (...allowedRoles: number[]) => {
	return (req: RequestWithUserInfo, res: Response, next: NextFunction) => {
		if (!req?.roles) return res.sendStatus(401);
		const rolesArray = [...allowedRoles];
		const result = req.roles
			.map(role => rolesArray.includes(role))
			.find(val => val === true);
		if (!result) return res.sendStatus(401);
		next();
	};
};

module.exports = verifyRoles;
