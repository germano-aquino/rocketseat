import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/meetapp/users', UserController.store);
routes.post('/meetapp/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/meetapp/users', UserController.update);

export default routes;
