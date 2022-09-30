import {
  Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Res, BadGatewayException, ExceptionFilter,
  Catch, ArgumentsHost, HttpException, HttpStatus, ForbiddenException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('/signup')
  async Signup(@Body() CreateAuthDto: CreateAuthDto) {
    try {
      const data = await this.authService.signup(CreateAuthDto);
      // console.log("data - ", data);
      return {
        HttpStatus: 200,
        data,
      }
    }
    catch (error) {
      throw new ForbiddenException();
    }
  }

  @Post('/create')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createAuthDto: CreateAuthDto) {
    await this.authService.create(createAuthDto)
    return 'This action returns a user';
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   console.log(typeof id === 'number'); // true
  //   return 'This action returns a user';
  // }

  @Post('/signin')
  async signin(@Body() createAuthDto: CreateAuthDto): Promise<any> {

    const userdata = await this.authService.signin(createAuthDto);
    console.log(userdata, 'dataFind');

    return {
      status: true,
      httpStatus: HttpStatus.CREATED,
      message: 'Success',
      data: userdata,
    }
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
