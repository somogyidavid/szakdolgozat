import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty()
    password?: string;

    @ApiProperty()
    name?: string;

    @ApiProperty()
    age?: number;

    @ApiProperty()
    interests?: string[];
}