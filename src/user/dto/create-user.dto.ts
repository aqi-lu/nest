import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: '请输入用户名',
  })
  @Length(6, 18, { message: '请输入6到18位的用户名' })
  username: string;
  @IsString({
    message: '请输入用户密码',
  })
  @Length(6, 18, { message: '请输入6到18位的用户密码' })
  password: string;
}
