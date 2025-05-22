import { Request, Response } from 'express';
import AppDataSource from '../config/database';
import { Software } from '../entities/Software';

const softwareRepo = AppDataSource.getRepository(Software);

export const createSoftware = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, accessLevels } = req.body;

    if (
      !name ||
      !description ||
      !Array.isArray(accessLevels) ||
      accessLevels.length === 0
    ) {
      res.status(400).json({ message: 'Invalid software data' });
      return;
    }

    const software = softwareRepo.create({
      name,
      description,
      accessLevels,
    });

    await softwareRepo.save(software);
    res.status(201).json(software);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSoftwareList = async (_req: Request, res: Response): Promise<void> => {
  try {
    const softwareList = await softwareRepo.find();
    res.json(softwareList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
