import express from 'express';
import { deleteUser, getAllUsers, postUser } from '../controllers/user';
import { createUserMiddleware } from '../middlewares';

const router = express.Router();

router.post('/', createUserMiddleware, postUser);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);

export default router;
