import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty()
    name?: string;

    @ApiProperty()
    age?: number;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    interests?: string[];
}