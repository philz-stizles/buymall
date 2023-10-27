import { expressMiddleware } from '@apollo/server/express4';
import { Server } from 'http';
import { Express } from 'express';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import pkg from 'body-parser';
import typeDefs from '@src/graphql/typeDefs';
import resolvers from '@src/graphql/resolvers';
import formatError from '@src/graphql/format-error';
import context from '@src/graphql/context';
import { IUser } from '@src/models/user.model';
import config from '@src/config';
import logger from '@src/config/logger';

const { json } = pkg;

interface AppContext {
  isAuthenticated: boolean;
  user: IUser | null;
}

const initGraphQL = async (app: Express, httpServer: Server) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/subscriptions',
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);

  const plugins = [
    ApolloServerPluginDrainHttpServer({ httpServer }), // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ];
  if (config.env === 'production') {
    plugins.push(ApolloServerPluginLandingPageDisabled());
  }

  const apolloServer = new ApolloServer<AppContext>({
    schema,
    plugins,
    csrfPrevention: true,
    // When running multiple instances of your server, you should use a shared cache backend.
    // This enables one server instance to use the cached result from another instance.
    cache: 'bounded',
    formatError, // Error formatting
    // dataSources, // DataSource - MongoDB
    // introspection: true,
  });

  await apolloServer.start();
  if (config.env !== 'production') {
    logger.info(`GraphQL running @ http://localhost:${config.port}/graphql`);
  }

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    // graphqlUploadExpress({
    //   // This middleware should be added before calling `expressMiddleware()`.
    //   maxFieldSize: 1000000, // Maximum allowed non-file multipart form field size in bytes; enough for your queries.
    //   maxFileSize: 10000, // Maximum allowed file size in bytes.
    //   maxFiles: 5, // Maximum allowed number of files.
    // }),
    expressMiddleware(apolloServer, {
      context,
    })
  );
};

export default initGraphQL;
