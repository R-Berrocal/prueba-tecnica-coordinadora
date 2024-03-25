import express from 'express';
import { deleteUser, getAllUsers, postUser } from '../controllers/user';
import { createUserMiddleware, validateJWT } from '../middlewares';

const router = express.Router();

router.post('/', createUserMiddleware, postUser);
router.get('/', validateJWT, getAllUsers);
router.delete('/:id', validateJWT, deleteUser);

export default router;
