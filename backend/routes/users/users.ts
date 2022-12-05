import { Router } from 'express';

// Getting all the public repos from a specific user.
// The function gets the username through a query in the request's url.
const getAllUsers = () => async (req, res) => {
  const userName = req.query.username;

  // res.send(reposList.data);
};

export default function userRoutes() {
  const router = new Router();

  router.get('/allusers', getAllUsers());

  return router;
}
