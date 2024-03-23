import express from 'express';
import { authLoginMiddleware } from '../middlewares';
import { authLogin, authRevalidateToken } from '../controllers/auth';
import { validateJWT } from '../middlewares/validateJwt';

const router = express.Router();

router.post('/login', authLoginMiddleware, authLogin);
router.get('/', validateJWT, authRevalidateToken);

export default router;
