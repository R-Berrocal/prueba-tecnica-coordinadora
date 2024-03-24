import express from 'express';
import {
  deleteEvent,
  getAllEvents,
  getAssistants,
  getEvent,
  postEvent,
  registerAssistants,
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
router.post('/:id/register', validateJWT, registerAssistants);
router.get('/:id/registrations', validateJWT, getAssistants);

export default router;
