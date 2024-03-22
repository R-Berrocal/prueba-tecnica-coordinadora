import { Response } from 'express';

export interface IEndpointResponse {
  res: Response;
  code?: number;
  status?: boolean;
  message: string;
  body: any;
}
