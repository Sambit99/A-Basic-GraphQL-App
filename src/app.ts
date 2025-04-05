import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import { StatusCode } from './constant/statusCodes';
import { ResponseMessage } from './constant/responseMessage';
import ApiError from './util/ApiError';

const app: Application = express();

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
import ApiRouter from './router/api.router';
import globalErrorHandler from './middleware/globalErrorHandler';

app.use('/api/v1', ApiRouter);

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
