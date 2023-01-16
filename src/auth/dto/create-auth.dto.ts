import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthDto {
    @IsString({
        message: 'Require First Name!',
    })
    @ApiProperty({
        example: 'John',
        description: 'Enter Your First Name',
      })      
      firstName: string;

      @IsString({
        message: 'Require Last Name!',
    })
    @ApiProperty({
        example: 'Sir',
        description: 'Enter Your Last Name',
      })      
      lastName: string;

      @IsString({
        message: 'Require Email!',
    })
    @ApiProperty({
        example: 'John@gmail.com',
        description: 'Enter Your Email',
      })      
      email: any;

      @IsString({
        message: 'Require Password!',
    })
    @ApiProperty({
        example: 'John@123',
        description: 'Enter Your Password',
      })      
      password: string;

      
    //   @IsString({
    //     message: 'Require Active!',
    // })
    // @ApiProperty({
    //     example: 'ACTIVE',
    //     description: 'User is Active',
    //   })      
    //   isActive: string; 

}