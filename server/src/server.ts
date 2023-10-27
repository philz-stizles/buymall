import { Express } from 'express';
import http from 'http';
import app from './app';
import connectDB from './db/index';
import seedData from '@src/db/seeder';
import config from '@src/config';
import logger from '@src/config/logger';
// import initSocketIO from './socket';
import initGraphQL from './graphql';

const startUp = async (expressApp: Express) => {
  // Connect to database.
  await connectDB(config.dbUri);

  // Seed data.
  await seedData();

  // initialize http server
  const httpServer = http.createServer(expressApp); // Now we have our own http instance
  // unlike with express where the server was implicitly create for us

  // Initialize GraphQL
  initGraphQL(expressApp, httpServer);

  // // Initialize Socket.io
  // initSocketIO(httpServer);

  const PORT = config.port;
  const server = httpServer.listen(PORT, () => {
    logger.info(`🚀 Server running on ${PORT} ${process.env.NODE_ENV}`);
  });

  process.on('unhandledRejection', (err?: Error) => {
    logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err?.name, err?.message);
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('SIGTERM', () => {
    logger.info('SIGTERM RECEIVED. Shutting down gracefully...');
    server.close(() => {
      logger.info('💥 Process terminated!');
    });
  });
};

startUp(app);
