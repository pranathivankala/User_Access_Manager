import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type AccessLevel = 'Read' | 'Write' | 'Admin';

@Entity()
export class Software {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column('simple-array')
  accessLevels!: AccessLevel[]; 
}
