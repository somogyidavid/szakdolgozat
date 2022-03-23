import { ApiProperty } from '@nestjs/swagger';

export class RequestPlaceDetailsDto {
    @ApiProperty()
    placeId!: string;

    @ApiProperty()
    language?: string;
}