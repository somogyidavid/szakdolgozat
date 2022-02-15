import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { CastErrorExceptionFilter } from '../exceptions/castError-exception.filter';
import { ValidationExceptionFilter } from '../exceptions/validation-exception.filter';
import { ApiErrorExceptionFilter } from '../exceptions/ApiError-exception.filter';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LocationDto } from './dto/LocationDto';
import { LocationsService } from './locations.service';

@ApiTags('LocationInfos')
@Controller('locations')
@UseFilters(new CastErrorExceptionFilter())
@UseFilters(new ValidationExceptionFilter())
@UseFilters(new ApiErrorExceptionFilter())
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/weather')
    async getWeather(@Body() locationDto: LocationDto): Promise<Object> {
        return await this.locationsService.getWeather(locationDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/address')
    async getAddress(@Body() locationDto: LocationDto): Promise<Object> {
        return await this.locationsService.getAddress(locationDto);
    }
}
