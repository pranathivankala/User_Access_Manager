import { Response } from 'express';
import AppDataSource from '../config/database';
import { Request as AccessRequest } from '../entities/Request';
import { User } from '../entities/User';
import { Software } from '../entities/Software';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest';

const requestRepo = AppDataSource.getRepository(AccessRequest);
const userRepo = AppDataSource.getRepository(User);
const softwareRepo = AppDataSource.getRepository(Software);

export const submitRequest = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { softwareId, accessType, reason } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: Missing user information' });
      return;
    }

    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const software = await softwareRepo.findOneBy({ id: softwareId });
    if (!software) {
      res.status(404).json({ message: 'Software not found' });
      return;
    }

    if (!software.accessLevels.includes(accessType)) {
      res.status(400).json({ message: 'Invalid access type' });
      return;
    }

    const newRequest = requestRepo.create({
      user,
      software,
      accessType,
      reason,
      status: 'Pending',
    });

    await requestRepo.save(newRequest);
    res.status(201).json(newRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPendingRequests = async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const requests = await requestRepo.find({
      where: { status: 'Pending' },
      relations: ['user', 'software'],
    });
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateRequestStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      res.status(400).json({ message: 'Invalid status' });
      return;
    }

    const request = await requestRepo.findOne({
      where: { id: Number(id) },
      relations: ['user', 'software'],
    });

    if (!request) {
      res.status(404).json({ message: 'Request not found' });
      return;
    }

    if (request.status !== 'Pending') {
      res.status(400).json({ message: 'Request already processed' });
      return;
    }

    request.status = status;
    await requestRepo.save(request);
    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMyRequests = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: Missing user information' });
      return;
    }

    const requests = await requestRepo.find({
      where: { user: { id: userId } },
      relations: ['software'],
      order: { id: 'DESC' },
    });

    res.json(requests);
  } catch (error) {
    console.error('Failed to fetch user requests', error);
    res.status(500).json({ message: 'Server error' });
  }
};
