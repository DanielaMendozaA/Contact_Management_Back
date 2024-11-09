import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthService, LoginResponse } from './interfaces/auth-service.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'src/users/entities/user.entity';
import { ApiDocLoginUser, ApiDocRegisterUser } from './decorators/auth-swagger.decorator';
import { RegisterResponseDto } from './dto/register-response.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags("Auth")
@ApiExtraModels(RegisterResponseDto, LoginResponseDto)
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService
  ) {}

  @ApiDocRegisterUser(RegisterResponseDto)
  @Post('register')
  create(@Body() createUserDto : CreateUserDto) : Promise<Partial<User>>{
    return this.authService.register(createUserDto)
  }

  @ApiDocLoginUser(LoginResponseDto)
  @Post('login')
  login(@Body() loginUserDto : LoginUserDto): Promise<LoginResponse>{
    return this.authService.login(loginUserDto)
  }

}
