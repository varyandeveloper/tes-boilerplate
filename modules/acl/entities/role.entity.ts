import {
  Column,
  Entity,
  JoinTable,
  JoinColumn,
  BaseEntity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import AccessSchema from './access.schema';
import PermissionEntity from './permission.entity';
import UserEntity from '../../user/entities/user.entity';

@Entity('roles')
export default class RoleEntity extends BaseEntity implements AccessSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60, nullable: false, unique: true })
  name: string;

  @Column({ length: 60, nullable: true })
  description?: string;

  @ManyToMany(() => PermissionEntity)
  @JoinTable({ name: 'role_has_permission' })
  permissions: PermissionEntity[];

  @ManyToMany(() => UserEntity)
  @JoinTable({ name: 'user_roles' })
  @JoinColumn({ name: 'usersId' })
  user: UserEntity;
}
