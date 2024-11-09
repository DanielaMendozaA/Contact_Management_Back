import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isString, isUUID } from 'class-validator';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { IUserService } from './interfaces/user-service.interface';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user)
  }


  async findOneByTerm(term: string): Promise<User> {
    const strategies = [
      {
        condition: () => isUUID(term),
        query: () => this.userRepository.findOne({ where: { id: term } }),
      },
      {
        condition: () => isString(term),
        query: async () => {
          const query = this.userRepository.createQueryBuilder('user');
          query.where('user.email = :term', { term })
               .orWhere('user.userName = :term', { term });
          return await query.getOne();
        },
      },
    ];
  
    const strategy = strategies.find(strategy => strategy.condition());

    if (!strategy) {
      throw new BadRequestException('Invalid search term. Must be a valid UUID, email, or username.');
    }
  
    const user = await strategy.query();
  
    return user;
  }
  
  

  async findByEmailWithPassword(email: string): Promise<Partial<User>>{
    const user = await this.userRepository.findOne({
      where: {email},
      select: {password: true, email: true, id: true}
    });
    
    if(!user)
      throw new NotFoundException("User not found")

    return user
  }

}
