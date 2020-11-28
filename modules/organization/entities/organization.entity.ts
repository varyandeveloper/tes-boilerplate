import {
  Column,
  Entity,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrganizationSchema from './organization.schema';
import UserEntity from '../../user/entities/user.entity';

@Entity('organizations')
export default class OrganizationEntity
  extends BaseEntity
  implements OrganizationSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    unique: true,
    nullable: false,
  })
  name: string;
  @CreateDateColumn({ name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  'createdAt': Date;
  @CreateDateColumn({
    name: 'updatedAt',
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  'updatedAt': Date;
  @CreateDateColumn({ name: 'deletedAt', default: null }) 'deletedAt': Date;

  @OneToMany(() => UserEntity, (user) => user.organization)
  users: Array<UserEntity>;
}
