import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import { StatusCode } from './constant/statusCodes.js';
import { ResponseMessage } from './constant/responseMessage.js';
import ApiError from './util/ApiError.js';
import { expressMiddleware } from '@apollo/server/express4';
import { connectGraphQL } from './graphql/graphql.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: Application = express();

const graphQlServer = connectGraphQL();
await graphQlServer.start();

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: ['http://localhost:4000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true // Note: In Order to allow Cookies
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: false }));

// Routes
import ApiRouter from './router/api.router.js';
import globalErrorHandler from './middleware/globalErrorHandler.js';

app.use('/api/v1', ApiRouter);
app.use('/graphql', expressMiddleware(graphQlServer));

// 404 Error Handler
app.use((req: Request, _: Response, next: NextFunction) => {
  try {
    throw new Error(ResponseMessage.NOT_FOUND('Route'));
  } catch (error) {
    ApiError(next, error, req, StatusCode.NOT_FOUND);
  }
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;

// import Logger from './util/Logger.js';
// import config from './config/config.js';
// import databaseService from './service/databaseService.js';
// import { connectGraphQL } from './graphql/graphql.js';

// const port = Number(config.PORT) || 3000;

// const db = await databaseService.connect();
// Logger.info('DATABASE CONNECTED', { meta: { name: db.name } });

// const graphQlServer = await connectGraphQL(port);

// Logger.info('Apollo Server Started', {
//   meta: {
//     PORT: port,
//     ENV: config.ENV,
//     SERVER_URL: graphQlServer.url
//   }
// });
