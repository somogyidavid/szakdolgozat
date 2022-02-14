import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import Location from '../schemas/location.schema';

export class CreateActivityDto {
    @ApiProperty()
    user!: Types.ObjectId;

    @ApiProperty()
    name!: string;

    @ApiProperty()
    isAllDay!: boolean;

    @ApiProperty()
    startingDate!: Date;

    @ApiProperty()
    endingDate!: Date;

    @ApiProperty()
    location!: Location;

    @ApiProperty()
    reminder?: number;

    @ApiProperty()
    timeType?: string;

    @ApiProperty()
    photoReference?: string;
}