import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import RoleEntity from './role.entity';
import AccessSchema from './access.schema';
import UserEntity from '../../user/entities/user.entity';

@Entity('permissions')
export default class PermissionEntity
  extends BaseEntity
  implements AccessSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60, nullable: false, unique: true })
  name: string;

  @Column({ length: 255, nullable: true })
  description?: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable({ name: 'role_has_permission' })
  roles: Array<RoleEntity>;

  @ManyToMany(() => UserEntity)
  @JoinTable({ name: 'user_permissions' })
  user: UserEntity;
}
