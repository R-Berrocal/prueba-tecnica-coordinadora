import express from 'express';
import {
  deleteEvent,
  getAllEvents,
  getEvent,
  postEvent,
  updateEvent,
} from '../controllers/event';
import {
  createEventMiddleware,
  updateEventMiddleware,
  validateJWT,
} from '../middlewares';

const router = express.Router();

router.post('/', createEventMiddleware, postEvent);
router.get('/', validateJWT, getAllEvents);
router.get('/:id', validateJWT, getEvent);
router.put('/:id', updateEventMiddleware, updateEvent);
router.delete('/:id', validateJWT, deleteEvent);

export default router;
