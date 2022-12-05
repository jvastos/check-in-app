import express from 'express';
import userRoutes from '../routes/users/users';
import cors from 'cors';

export function createServer() {
  const app = express();

  app.use(
    cors({
      origin: '*',
    })
  );

  app.use(express.json());

  app.use('/', userRoutes());

  return app;
}
