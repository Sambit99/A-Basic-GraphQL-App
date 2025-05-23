import { Request } from 'express';
import { HttpError } from '../types/types.js';
import { ApplicationEnvironment } from '../constant/application.js';
import { ResponseMessage } from '../constant/responseMessage.js';
import config from '../config/config.js';
import Logger from './Logger.js';

export default (
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  err: Error | unknown,
  req: Request,
  errorStatusCode: number = 500,
  customErrorMessage: string = ''
): HttpError => {
  const isError = err instanceof Error;
  const errorObj: HttpError = {
    success: false,
    statusCode: errorStatusCode,
    request: {
      ip: req.ip,
      method: req.method,
      url: req.originalUrl
    },

    message: customErrorMessage ? customErrorMessage : isError ? err.message : ResponseMessage.INTERNAL_SERVER_ERROR,
    data: null,
    trace: isError ? { error: err.stack } : err instanceof Object ? err : null
  };

  if (config.ENV === ApplicationEnvironment.PRODUCTION) {
    delete errorObj.request.ip;
    delete errorObj.trace;
  }

  //   Log
  Logger.info(`CONTROLLER ERROR`, { meta: errorObj });

  return errorObj;
};
