import { Body, Controller, Get, Post, UseFilters, UseGuards } from '@nestjs/common';
import { CastErrorExceptionFilter } from '../exceptions/castError-exception.filter';
import { ValidationExceptionFilter } from '../exceptions/validation-exception.filter';
import { ApiErrorExceptionFilter } from '../exceptions/ApiError-exception.filter';
import { TrainService } from './train.service';
import { AuthGuard } from '@nestjs/passport';
import { WeatherDto } from './dto/weatherDto';

@Controller('train')
@UseFilters(new CastErrorExceptionFilter())
@UseFilters(new ValidationExceptionFilter())
@UseFilters(new ApiErrorExceptionFilter())
export class TrainController {
    constructor(private readonly trainService: TrainService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/learn')
    async train(): Promise<boolean> {
        return await this.trainService.train();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/test')
    async testSamples(): Promise<Object[]> {
        return await this.trainService.testSamples();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/predict')
    async predict(@Body() weatherDto: WeatherDto): Promise<number> {
        return await this.trainService.predict(weatherDto);
    }
}
