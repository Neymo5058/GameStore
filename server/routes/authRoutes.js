import express from 'express';
import { register, login, logout, me, devCreateUser } from '../controllers/auth.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', auth, me);


if (process.env.NODE_ENV !== 'production') {
  router.post('/dev/create-user', devCreateUser);
}

export default router;
