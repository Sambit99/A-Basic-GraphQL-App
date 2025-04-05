import { Request, Response } from 'express';
import { HttpResponse } from '../types/types.js';
import config from '../config/config.js';
import { ApplicationEnvironment } from '../constant/application.js';
import Logger from './Logger.js';

export default (req: Request, res: Response, statusCode: number, message: string, data: unknown = null): void => {
  const response: HttpResponse = {
    success: true,
    statusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl
    },
    data,
    message
  };

  if (config.ENV === ApplicationEnvironment.PRODUCTION) delete response.request.ip;

  // Log
  Logger.info(`CONTROLLER_RESPONSE`, {
    meta: response
  });

  res.status(statusCode).json(response);
};
