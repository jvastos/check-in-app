import dotenv from 'dotenv';
dotenv.config();
import { createServer } from './server';

const PORT = process.env.PORT;

async function main() {
  const server = createServer();

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Something went wrong running the main fnc', err);

  process.exit(1);
});
