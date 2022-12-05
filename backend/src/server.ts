import express from 'express';
import userRoutes from '../routes/users/users';
import cors from 'cors';

export function createServer(db: any) {
  const app = express();

  app.use(
    cors({
      origin: '*',
    })
  );

  app.use(express.json());

  app.use('/', userRoutes(db));

  return app;
}
