import {
  Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Res, BadGatewayException, ExceptionFilter,
  Catch, ArgumentsHost, HttpException, HttpStatus, ForbiddenException
} from '@nestjs/common';
import { emitWarning } from 'process';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('/signup')
  async Signup(@Res() res, @Body() CreateAuthDto: CreateAuthDto) {
    try {
      const data = await this.authService.signup(CreateAuthDto);
      // console.log("data - ", data);
      if(data){
        return 'user already exist'
      }
      return res.status(HttpStatus.CREATED).send({
        message: 'User has been created successfully.',
        data
    })
      // return res.status  {
      //   HttpStatus: 200,
      //   data,
        
      // }
    }
    catch (error) {
      throw new ForbiddenException();
    }
  }

  @Post('/create')
  @UsePipes(new ValidationPipe({ transform: true }))

  async create(@Body() createAuthDto: CreateAuthDto) {

    await this.authService.create(createAuthDto)

    return 'This action returns a new user from create api.';
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   console.log(typeof id === 'number'); // true
  //   return 'This action returns a user';
  // }

  @Post('/signin')
  async signin(@Body() email: string,password: string): Promise<any> {

    const userdata = await this.authService.signin(email, password);
    // console.log(userdata, 'dataFind');
 
    return {
      status: true,
      httpStatus: HttpStatus.CREATED,
      message: 'Success',
      data: userdata,
    }
  }

  @Post('/gethash')
  async gethash(@Res() res,req, @Body() email): Promise<any>{

    var axiosBody = JSON.stringify({ ...req.body });
    console.log(axiosBody, 'axiosBody')

    
    // let hash = await this.authService.generateBodyHash(axiosBody)
    // console.log(hash);
    

    return{
      status: true,
      HttpStatus: HttpStatus.CREATED,
      message: 'Success',
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
