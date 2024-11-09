import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ContactCategoryEnum } from 'src/common/enums/category.enum';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const mockUser: Partial<User> = {
    id: 'uuid-1234',
    email: 'test@email.com',
    userName: 'testUser',
    password: 'hashedPassword123',
    role: ContactCategoryEnum.REGULAR_CLIENT,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create and save a new user', async () => {
      const createUserDto: CreateUserDto = {
        userName: 'testUser',
        email: 'test@email.com',
        password: 'password',
      };

      jest.spyOn(userRepository, 'create').mockReturnValue(mockUser as User);
      jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser as User);

      const result = await service.createUser(createUserDto);

      expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(userRepository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findOneByTerm', () => {
    it('should find a user by id', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as User);

      const result = await service.findOneByTerm('uuid-1234');

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 'uuid-1234' } });
      expect(result).toEqual(mockUser);
    });

    it('should find a user by email or username', async () => {
      const queryBuilderMock = {
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockUser as User),
      };

      jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue(queryBuilderMock as any);

      const result = await service.findOneByTerm('test@email.com');

      expect(userRepository.createQueryBuilder).toHaveBeenCalledWith('user');
      expect(queryBuilderMock.where).toHaveBeenCalledWith('user.email = :term', { term: 'test@email.com' });
      expect(queryBuilderMock.orWhere).toHaveBeenCalledWith('user.userName = :term', { term: 'test@email.com' });
      expect(result).toEqual(mockUser);
    });

    it('should throw BadRequestException if term is invalid', async () => {
      await expect(service.findOneByTerm('invalid-term')).rejects.toThrow(BadRequestException);
    });
  });

  describe('findByEmailWithPassword', () => {
    it('should return a user with the password field', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as User);

      const result = await service.findByEmailWithPassword('test@email.com');

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@email.com' },
        select: { password: true, email: true, id: true, role: true },
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findByEmailWithPassword('test@email.com')).rejects.toThrow(NotFoundException);
    });
  });
});
