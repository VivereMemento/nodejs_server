import express, { Express, Request, Response } from 'express';
const router = express.Router();

/* GET home page. */
router.post('/login', function (_, res: Response) {
	res.send('Hello from index');
});

export default router;
