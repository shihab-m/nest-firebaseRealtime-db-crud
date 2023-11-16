import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateNoteDto {
  @ApiProperty({example: "New Note"})
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({example: "This is a test note description"})
  @IsString()
  description: string;
}