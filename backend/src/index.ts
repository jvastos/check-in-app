import dotenv from 'dotenv';
dotenv.config();
import { createServer } from './server';
import { MongoClient } from 'mongodb';

const DB_URL = process.env.MONGODB_URL!;
const DB_NAME = 'check-in';

const PORT = process.env.PORT;

async function main() {
  const client = new MongoClient(DB_URL);
  await client.connect();

  const db = client.db(DB_NAME);

  const server = createServer(db);

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Something went wrong running the main fnc', err);

  process.exit(1);
});
