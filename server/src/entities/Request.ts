import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Software } from './Software';

export type RequestStatus = 'Pending' | 'Approved' | 'Rejected';
export type AccessType = 'Read' | 'Write' | 'Admin';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Software)
  @JoinColumn({ name: 'softwareId' })
  software!: Software;

  @Column()
  accessType!: AccessType;

  @Column('text')
  reason!: string;

  @Column()
  status!: RequestStatus;
}
