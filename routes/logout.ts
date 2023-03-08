import express from 'express';

import { handleLogout } from '../controllers/logoutController';

const router = express.Router();
router.post('/logout', handleLogout);

export default router;
