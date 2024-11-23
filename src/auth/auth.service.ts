
import {  Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


import { IAuthService } from './interfaces/auth-service.interface';
import { IUserService } from 'src/users/interfaces/user-service.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';



@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
    private readonly jwtService: JwtService,
  ) {};

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.validateUser(email, password);

    if (!user)
      throw new UnauthorizedException("Invalid Credentials")

    const payload: JwtPayload = { email: user.email, id: user.id }

    const token = this.generateJwtToken(payload)

    return {
      user,
      token
    }
  }


  async register(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto
    const hashedPassword = this.hashingPassword(password)
    const newUser = {
      ...rest,
      password: hashedPassword
    }
    const createdUser = await this.userService.createUser(newUser)
    const userResponse = {
      id: createdUser.id,
      userName: createdUser.userName,
      email: createdUser.email
    }
    
    return userResponse
  }

  private hashingPassword(password: string) {
    const salt: string = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt)
  }

  private generateJwtToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload)
  }

  private async validateUser(userEmail: string, userPassword: string): Promise<Partial<User>> {
    const user = await this.userService.findByEmailWithPassword(userEmail);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials"); 
    }
    const { password, email, id }: Partial<User> = user

    const isValidPassword = this.comparePassword(userPassword, password)
    if (!isValidPassword)
      throw new UnauthorizedException("Invalid credentials")

    return { email, id }
  }

  private comparePassword(userPassword: string, password: string): boolean {
    return bcrypt.compareSync(userPassword, password);
  }


}
