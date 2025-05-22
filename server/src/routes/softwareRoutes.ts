import { Router } from 'express';
import { createSoftware, getSoftwareList } from '../controllers/softwareController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware(['Admin']), createSoftware);

router.get('/', authMiddleware(), getSoftwareList);

export default router;
