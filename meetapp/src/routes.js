import { Router } from 'express';
import User from './app/models/User';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/meetapp/users', async (req, res) => {
  const user = await User.create({
    name: 'Germano Aquino',
    email: 'jajaja@gmail.com',
    password_hash: '123456',
  });

  return res.json(user);
});

routes.post('/meetapp/users', UserController.store);

export default routes;
