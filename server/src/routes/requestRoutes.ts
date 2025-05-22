import { Router } from 'express';
import {
  submitRequest,
  getPendingRequests,
  updateRequestStatus,
  getMyRequests 
} from '../controllers/requestController';

import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware('Employee'), submitRequest);
router.get('/', authMiddleware(['Manager', 'Admin']), getPendingRequests);
router.get('/my-requests', authMiddleware(), getMyRequests); 
router.patch('/:id', authMiddleware(['Manager', 'Admin']), updateRequestStatus);

export default router;
