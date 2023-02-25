import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Res,
  Query,
  Headers,
  HttpCode,
  Patch,
  Delete,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return createUserDto;
  // }

  // @Get()
  // findAll(@Query() query) {
  //   console.log(query)
  //   return {
  //     code: 200,
  //     message: query.name
  //   }
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  @Get('code')
  createCode(@Request() req,@Res() res,@Session() session) {
    const Captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#9fc5e8',
    })
    console.log('123',Captcha)
    session.code = Captcha.text;
    res.type('image/svg+xml')
    res.send(Captcha.data)
  }

  @Post('create')
  createUser(@Body() Body,@Session() session) {
    console.log(Body,session.code)
    if(session.code.toLocaleLowerCase() === Body?.code?.toLocaleLowerCase()){
      return {
        code: 200,
        result: {token: "SUIBIANXIEXIEDEBUYAOKANLALALALAL"},
        message:'验证码正确'
      }
    }else{
      return {
        code: 100,
        message:'验证码错误'
      }
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
