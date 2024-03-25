import { Request } from 'express';
interface RequestUserAuth extends Request {
  user?: any;
}

export default RequestUserAuth;
