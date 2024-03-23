import express from 'express';
import {
  deleteEvent,
  getAllEvents,
  getEvent,
  postEvent,
  updateEvent,
} from '../controllers/event';
import { createEventMiddleware } from '../middlewares';

const router = express.Router();

router.post('/', createEventMiddleware, postEvent);
router.get('/', getAllEvents);
router.get('/:id', getEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
