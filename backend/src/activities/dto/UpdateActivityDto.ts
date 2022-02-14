import { ApiProperty } from '@nestjs/swagger';
import Location from '../schemas/location.schema';

export class UpdateActivityDto {
    @ApiProperty()
    name?: string;

    @ApiProperty()
    isAllDay?: boolean;

    @ApiProperty()
    startingDate?: Date;

    @ApiProperty()
    endingDate?: Date;

    @ApiProperty()
    location?: Location;

    @ApiProperty()
    reminder?: number;

    @ApiProperty()
    timeType?: string;
}