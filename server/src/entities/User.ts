import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type UserRole = 'Employee' | 'Manager' | 'Admin';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 50 })
  username!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: ['Employee', 'Manager', 'Admin'],
    default: 'Employee',
  })
  role!: UserRole;
}
