import { IsEmail, IsNotEmpty } from 'class-validator';
import UserEntity from '../../../user/entities/user.entity';
import { IsUniqueColumn } from '../../../core/validators/entity.exists.validator';

export default class UserRequest {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsUniqueColumn(UserEntity)
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUniqueColumn(UserEntity)
  email: string;
}
