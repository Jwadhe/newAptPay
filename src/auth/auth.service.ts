import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import { Model } from 'mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { databaseProviders } from './mongoose';
import { Auth, AuthDocument } from './schema/auth.schema';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
  sucesHandle: any;

  constructor
    (@InjectModel(Auth.name) private authModel: Model<AuthDocument>) { }

  // private readonly sucesHandle: Handler

  // async signup(CreateAuthDto: CreateAuthDto):Promise<any> {
  //   const email = CreateAuthDto.email
  //     const user = await this.authModel.findOne({email })

  //     // if(user){
  //     //   return Error('User already registered')
  //     // }
  //     // console.log(user,'found');

  //     const userData = await this.authModel.create({
  //       ...CreateAuthDto
  //     });   

  //     if(!userData){
  //       throw Error ('Not Created!')
  //     }

  //     const user1 = userData.toObject();

  //     return user1     

  //   }


  // public async SignUp(CreateAuthDto: CreateAuthDto): Promise<any> {
  //   try {
  //     const salt = 'random_password';

  //     var getuser = await this.authModel.find({
  //       email: CreateAuthDto.email,
  //     });
  //     console.log('datafound',getuser);


  //     if (getuser.length != 0) {
  //       throw new Error('User already registered');
  //     }
  //     // const hashedPassword = await bcrypt.hash(CreateAuthDto.password, salt );

  //     const userRecord = await this.authModel.create({
  //       ...CreateAuthDto,
  //       // salt: salt.toString(),
  //       // password: hashedPassword,
  //     });
  //     console.log('createUser', userRecord);


  //     // const token = this.generateToken(userRecord);

  //     if (!userRecord) {
  //       throw new Error('User cannot be created');
  //     }

  //     // const user = userRecord.toObject();
  //     // Reflect.deleteProperty(user, 'password');
  //     // Reflect.deleteProperty(user, 'salt');
  //     return userRecord  ;
  //   } catch (e) {
  //     throw e;
  //   }
  // }


  async signup(CreateAuthDto: CreateAuthDto): Promise<any> {
    let user = await this.authModel.findOne({
      email: CreateAuthDto.email,
    });
    if (user) {
      return 'User already exists!';
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(CreateAuthDto.password, salt);
    const reqBody = {
      firstName: CreateAuthDto.firstName,
      lastName: CreateAuthDto.lastName,
      email: CreateAuthDto.email,
      password: hash,
    }
    const newUser = new this.authModel(reqBody);
    return await newUser.save();

  }



  async create(createAuthDto: CreateAuthDto) {
    try {
      const dataa = await this.authModel.create(createAuthDto)
      return dataa

    } catch (e) {
      throw new Error(e)

    }
  }

  // async signin(CreateAuthDto: CreateAuthDto): Promise<any> {
  //   console.log(CreateAuthDto,'dataaa');
    
  //   try {
  //     const user = this.authModel.find({
  //       ...CreateAuthDto
  //     })
  //     console.log('Data - ', user);
      
  //     const salt = await bcrypt.genSalt();
  //     const hash = await bcrypt.hash(CreateAuthDto.password, salt);
  //     const body = { 
  //       email: CreateAuthDto.email,
  //       password: hash
  //     }
      
  //     const newUser = new this.authModel(body);
  //     return await newUser.save();

  //   } catch (e) {
  //     return {
  //       status: false,
  //       message: "Something went wrong!",
  //       httpStatus: 400
  //     }
  //   }

  // }


  async signin(CreateAuthDto: CreateAuthDto): Promise<any> {
    try {
        const foundUser = await this.authModel.findOne({ email: CreateAuthDto.email }).exec();
        if (foundUser) {
            const { password } = foundUser;
            let checkPassword = await bcrypt.compare(CreateAuthDto.password, password);
            if (!checkPassword) {
              return this.sucesHandle.erroresponse(HttpStatus.UNAUTHORIZED,'Incorrect password or Not found')              

            }            
        }
        return this.sucesHandle.erroresponse(HttpStatus.UNAUTHORIZED, 'Incorrect username or password');

    } catch (error) {
        throw new ForbiddenException('something went wrong please try again later');
    }
}


  async findAll() {
    await this.authModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
