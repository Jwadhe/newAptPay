import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth,AuthDocument } from './schema/auth.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}



  async signup(CreateAuthDto: CreateAuthDto) {
    try{
      const createdUser = new this.authModel(CreateAuthDto);
    
    let data = await createdUser.save();
    return{
      status: true,
      message: "successs",
      data: data
    }
    }catch(e){
      return {
        status: false,
        message: "Something went wrong!",
        httpStatus: 400
    }
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
