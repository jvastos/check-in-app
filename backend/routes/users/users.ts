import { Router } from 'express';
import userControllers from '../../handlers/users';

const getAllUsers = userControllers.getAllUsers;
const updateUser = userControllers.updateUser;

function userRoutes(db: any) {
  const router = Router();

  router.get('/allusers', getAllUsers(db));
  router.patch('/:userId/:checkInStatus', updateUser(db));

  return router;
}

export default userRoutes;
