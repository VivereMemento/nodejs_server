import express from 'express';

import { handleNewUser } from '../controllers/registerController';

const router = express.Router();
router.post('/register', handleNewUser);

export default router;
