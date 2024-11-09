import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({ description: "UserName", example: 'DanielaMendozaA'})
  @IsString()
  @MinLength(6)
  @Matches(/^\S*$/, { message: 'userName - The username should not contain spaces' })
  userName: string;

  @ApiProperty({ description: "User's email", example: 'daniela@gmail.com'})
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "User's password, the password must have a Uppercase, lowercase letter and a number", example: 'Daniela.123'})
  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*)/,
    { message: 'password - The password must have at least one upper case letter, one lower case letter, and one number' }
  )
  password: string;
}
