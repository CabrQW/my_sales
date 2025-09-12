import { Router } from 'express'
import SessionsControllers from '../controllers/SessionsControllers';
import { sessinSchema } from '../schemas/SessionSchema';

const sessionsRouter = Router();
const SessionsController = new SessionsControllers();

sessionsRouter.post('/', sessinSchema, SessionsController.create)


export default sessionsRouter