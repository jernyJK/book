import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class BookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'book',
  })
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'book',
  })
  categories: string

  @IsOptional()
  @ApiPropertyOptional({
    type: Number,
    example: 10,
  })
  amount?: number
}
