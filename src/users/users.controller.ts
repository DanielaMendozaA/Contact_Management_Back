import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { IUserService } from './interfaces/user-service.interface';
import { ContactCategoryEnum } from 'src/common/enums/category.enum';
import { GetUserResponseDto } from './dto/get-user-response.dto';
import { VerifyAuthService } from 'src/auth/decorators/verify-auth.decorator';
import { ApiDocGetUserByTerm } from './decorators/users-swagger.decorator';

@ApiTags("Users")
@ApiExtraModels(GetUserResponseDto)
@Controller('users')
export class UsersController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService
  ) { }

  @ApiDocGetUserByTerm(GetUserResponseDto)
  @Get(':term')
  async findOneByTerm(@Param('term') term: string) {

    const user = await this.userService.findOneByTerm(term);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user
  }


}
