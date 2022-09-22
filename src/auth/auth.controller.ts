import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() createAuthDto: CreateAuthDto) {
    const userdata = await this.authService.signup(createAuthDto);
    if(userdata){
      return{
        message: 'User already exist',
        status: false,
        httpStatus: HttpStatus.BAD_REQUEST
      }
    }
    if (!userdata) {
      throw {
          message: 'User Not found',
          status: false,
          httpStatus: HttpStatus.NOT_FOUND,
      }
  }
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
