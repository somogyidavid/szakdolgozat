import { ApiProperty } from '@nestjs/swagger';

export class RequestActivitiesDto {
    @ApiProperty()
    latitude!: number;

    @ApiProperty()
    longitude!: number;

    @ApiProperty()
    types!: string[];

    @ApiProperty()
    language!: string;

    @ApiProperty()
    radius?: number;

    @ApiProperty()
    keyword?: string;

    @ApiProperty()
    maxPrice?: number;

    @ApiProperty()
    minPrice?: number;

    @ApiProperty()
    openNow?: boolean;
}