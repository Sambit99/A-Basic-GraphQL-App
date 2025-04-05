import { NextFunction, Request, Response } from 'express';
import ApiResponse from '../util/ApiResponse';
import { StatusCode } from '../constant/statusCodes';
import { ResponseMessage } from '../constant/responseMessage';
import ApiError from '../util/ApiError';
import Quicker from '../util/Quicker';

export default {
  self: (req: Request, res: Response, next: NextFunction) => {
    try {
      ApiResponse(req, res, StatusCode.OK, ResponseMessage.SUCCESS, {});
    } catch (error) {
      ApiError(next, error, req, StatusCode.INTERNAL_SERVER_ERROR);
    }
  },
  health: (req: Request, res: Response, next: NextFunction) => {
    try {
      const healthData = {
        application: Quicker.getApplicationHealth(),
        system: Quicker.getSystemHealth(),
        timestamp: Date.now()
      };
      ApiResponse(req, res, StatusCode.OK, ResponseMessage.SUCCESS, healthData);
    } catch (error) {
      ApiError(next, error, req, StatusCode.INTERNAL_SERVER_ERROR, ResponseMessage.INTERNAL_SERVER_ERROR);
    }
  }
};
