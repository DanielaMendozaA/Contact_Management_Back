import { ApiProperty } from '@nestjs/swagger';
import { ContactCategoryEnum } from 'src/common/enums/category.enum';

export class GetUserResponseDto {
  @ApiProperty({ example: 'DanielaMendozaA' })
  term: string;

  @ApiProperty({ example: 'daniela@gmail.com' })
  email: string;

  @ApiProperty({ example: 'DanielaMendozaA' })
  userName: string;

  @ApiProperty({ example: 'regular_client', enum: ContactCategoryEnum})
  role: ContactCategoryEnum;
}