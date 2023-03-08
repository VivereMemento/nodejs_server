import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import UserModel from '../model/User';
import { User } from '../model/usersDB';
export const handleNewUser = async (
	req: Request<undefined, undefined, User>,
	res: Response
) => {
	const { email, password, roles } = req.body;
	if (!email || !password)
		return res
			.status(400)
			.json({ message: 'Username and password are required.' });
	// check for duplicate email in the db
	const duplicate = await UserModel.findOne({ email }).exec();
	if (duplicate) return res.sendStatus(409); //Conflict
	try {
		// encrypt the password
		const hashedPassword = await bcrypt.hash(password, 10);
		// create and store the new user
		const result = await UserModel.create({
			email,
			password: hashedPassword,
		});

		res.status(201).json({ success: `New user with ${email} created!` });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
