import { Router } from 'express';

const getAllUsers = (db: any) => async (req: any, res: any) => {
  const users = await db.collection('users').find({}).toArray();
  console.log(users);
  res.send(users);
};

export default function userRoutes(db: any) {
  const router = Router();

  router.get('/allusers', getAllUsers(db));

  return router;
}
