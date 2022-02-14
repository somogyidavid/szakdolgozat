import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
    @ApiProperty()
    city?: string;

    @ApiProperty()
    formattedAddress?: string;

    @ApiProperty()
    latitude!: number;

    @ApiProperty()
    longitude!: number;
}