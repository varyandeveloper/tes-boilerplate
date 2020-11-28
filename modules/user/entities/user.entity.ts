import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  ManyToMany,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UserSchema from './user.schema';
import RoleEntity from '../../acl/entities/role.entity';
import PermissionEntity from '../../acl/entities/permission.entity';
import OrganizationEntity from '../../organization/entities/organization.entity';

@Entity('users')
export default class UserEntity extends BaseEntity implements UserSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
  @JoinColumn()
  manager: UserEntity;

  @Column({
    length: 60,
    nullable: false,
  })
  firstName: string;

  @Column({
    length: 60,
    nullable: false,
  })
  lastName: string;

  @Column({
    length: 60,
    unique: true,
  })
  username: string;

  @Column({
    length: 160,
  })
  password: string;

  @Column({
    length: 60,
    unique: true,
  })
  email: string;

  @CreateDateColumn({ name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  'createdAt': Date;
  @CreateDateColumn({
    name: 'updatedAt',
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  'updatedAt': Date;
  @CreateDateColumn({ name: 'deletedAt', default: null }) 'deletedAt': Date;

  @ManyToOne(() => OrganizationEntity)
  @JoinColumn()
  organization: OrganizationEntity;
  @ManyToMany(() => RoleEntity, (role) => role.user)
  @JoinTable({ name: 'user_roles' })
  roles: RoleEntity[];

  @ManyToMany(() => PermissionEntity, (permission) => permission.user)
  @JoinTable({ name: 'user_permissions' })
  permissions: PermissionEntity[];
}
