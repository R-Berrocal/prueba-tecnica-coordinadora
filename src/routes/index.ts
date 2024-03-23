import express from 'express';
import { get } from '../controllers';
import users from './user';
import auth from './auth';
import event from './event';

const router = express.Router();

//example of a route
router.get('/', get);
router.use('/users', users);
router.use('/auth', auth);
router.use('/events', event);

export default router;
