import { ApiProperty } from "@nestjs/swagger";

export class GetContactResponseDto {
  @ApiProperty({ description: 'Unique identifier for the contact', example: 1 })
  id: number;

  @ApiProperty({ description: 'Name of the contact', example: 'Daniela Mendoza' })
  name: string;

  @ApiProperty({ description: 'Email address of the contact', example: 'daniela@gmail.com' })
  email: string;

  @ApiProperty({ description: 'Phone number of the contact', example: '1234567890' })
  phone: number;

  @ApiProperty({ description: 'URL of the contact\'s photo', example: 'https://example.com/photo.jpg', required: false })
  photo?: string;

  @ApiProperty({ description: 'Latitude of the contact\'s location', example: 37.7749, required: false })
  latitude?: number;

  @ApiProperty({ description: 'Longitude of the contact\'s location', example: -122.4194, required: false })
  longitude?: number;
}
