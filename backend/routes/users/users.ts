import { Router } from 'express';
import userHandlers from '../../handlers/users';

const getAllUsers = userHandlers.getAllUsers;
const updateUser = userHandlers.updateUser;
const createUser = userHandlers.createUser;
const logInUser = userHandlers.logInUser;

function userRoutes(db: any) {
  const router = Router();

  router.get('/allusers', getAllUsers(db));
  router.patch('/:userId/:checkInStatus', updateUser(db));
  router.post('/users', createUser(db));
  router.post('/logInUser', logInUser(db));

  return router;
}

export default userRoutes;
