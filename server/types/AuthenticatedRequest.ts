import { Request } from 'express';
import { UserRole } from '../src/entities/User';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    role: UserRole;
  };
}
