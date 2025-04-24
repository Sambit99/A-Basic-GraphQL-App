/* eslint-disable @typescript-eslint/no-base-to-string */
// import express, { Application, NextFunction, Request, Response } from 'express';
// import path from 'path';
// import helmet from 'helmet';
// import cors from 'cors';
// import { StatusCode } from './constant/statusCodes.js';
// import { ResponseMessage } from './constant/responseMessage.js';
// import ApiError from './util/ApiError.js';

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import Logger from './util/Logger.js';
import config from './config/config.js';
import { graphQlSchema } from './graphql/schema/schema.js';
import databaseService from './service/databaseService.js';

import { getAllUsers, getPostOwner, getUserById } from './controller/user.controller.js';
import { getAllPosts, getPostById, getPostsOfUser } from './controller/post.controller.js';
import { IPost } from './model/post.model.js';
import { IUser } from './model/user.model.js';

const port = Number(config.PORT) || 3000;

const db = await databaseService.connect();
Logger.info('DATABASE CONNECTED', { meta: { name: db.name } });

const resolvers = {
  Query: {
    users: getAllUsers,
    posts: getAllPosts,
    user: getUserById,
    post: getPostById
  },
  User: {
    posts: async (user: IUser) => await getPostsOfUser(user._id)
  },
  Post: {
    owner: async (post: IPost) => await getPostOwner(String(post.owner))
  }
};

const server = new ApolloServer({
  typeDefs: graphQlSchema,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port }
});

Logger.info('Apollo Server Started', {
  meta: {
    PORT: port,
    ENV: config.ENV,
    SERVER_URL: url
  }
});

// const app: Application = express();

// Middlewares
// app.use(helmet());
// app.use(
//   cors({
//     origin: ['http://localhost:4000'],
//     methods: ['GET', 'POST', 'PATCH', 'DELETE'],
//     credentials: true // Note: In Order to allow Cookies
//   })
// );
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '..', 'public')));
// app.use(express.urlencoded({ extended: false }));

// Routes
// import ApiRouter from './router/api.router.js';
// import globalErrorHandler from './middleware/globalErrorHandler.js';

// app.use('/api/v1', ApiRouter);

// 404 Error Handler
// app.use((req: Request, _: Response, next: NextFunction) => {
//   try {
//     throw new Error(ResponseMessage.NOT_FOUND('Route'));
//   } catch (error) {
//     ApiError(next, error, req, StatusCode.NOT_FOUND);
//   }
// });

// Global Error Handler
// app.use(globalErrorHandler);

// export default app;
