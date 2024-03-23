import express from 'express';
import { postEvent } from '../controllers/event';
import { createEventMiddleware } from '../middlewares';

const router = express.Router();

router.post('/', createEventMiddleware, postEvent);

export default router;
