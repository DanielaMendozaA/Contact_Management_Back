import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsOptional, IsString, IsNumberString, IsInt, Min } from "class-validator";

export class QueryDto {
  @ApiPropertyOptional({ description: "Filter by name", example: 'Daniela Mendoza' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  name?: string;

  @ApiPropertyOptional({ description: "Filter by phone number", example: '1234567890' })
  @IsOptional()
  @IsNumberString()
  phone?: string;


  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

}
