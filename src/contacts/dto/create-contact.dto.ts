import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, Matches, IsEmail, IsNumber, IsOptional, IsEnum } from "class-validator";
import { ContactCategoryEnum } from "src/common/enums/category.enum";

export class CreateContactDto {
  @ApiProperty({ description: 'User ID', example: '45dea4fc-2cbc-4835-9a4a-46eb52effef0' })
  @IsString()
  userId: string;

  @ApiProperty({ description: "Name", example: 'Daniela Mendoza A' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ description: "Contact's email", example: 'daniela@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Phone number", example: 1234567890 })
  @IsString()
  phone: string;

  @ApiProperty({ description: "Contact's category", example: 'cliente' })
  @IsEnum(ContactCategoryEnum)
  category: ContactCategoryEnum;

  @ApiProperty({ description: "Photo URL", example: 'https://example.com/photo.jpg', required: false })
  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  idContactFromDevice?: string;

  @ApiProperty({ description: "Latitude", example: 37.7749, required: false })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiProperty({ description: "Longitude", example: -122.4194, required: false })
  @IsNumber()
  @IsOptional()
  longitude?: number;


}
