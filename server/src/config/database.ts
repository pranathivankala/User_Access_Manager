import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Software } from '../entities/Software';
import { Request } from '../entities/Request';

import 'dotenv/config';


const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'user_access_management',
  synchronize: true, 
  logging: false,
  entities: [User, Software, Request],
});

export default AppDataSource;
