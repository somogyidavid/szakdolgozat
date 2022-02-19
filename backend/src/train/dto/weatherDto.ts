import { ApiProperty } from '@nestjs/swagger';

export class WeatherDto {
    @ApiProperty()
    temp!: number;

    @ApiProperty()
    feelsLike!: number;

    @ApiProperty()
    humidity!: number;

    @ApiProperty()
    uvi!: number;

    @ApiProperty()
    clouds!: number;

    @ApiProperty()
    windSpeed!: number;

    @ApiProperty()
    weatherId!: number;
}