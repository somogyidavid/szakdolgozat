import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/AuthLoginDto';
import { AuthenticatedDto } from './dto/AuthenticatedDto';
import { AuthRegisterDto } from './dto/AuthRegisterDto';
import { ApiTags } from '@nestjs/swagger';
import { CastErrorExceptionFilter } from '../exceptions/castError-exception.filter';
import { ValidationExceptionFilter } from '../exceptions/validation-exception.filter';
import { ApiErrorExceptionFilter } from '../exceptions/ApiError-exception.filter';

@ApiTags('Auth')
@Controller('auth')
@UseFilters(new CastErrorExceptionFilter())
@UseFilters(new ValidationExceptionFilter())
@UseFilters(new ApiErrorExceptionFilter())
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    async login(@Body() authLoginDto: AuthLoginDto): Promise<AuthenticatedDto> {
        return await this.authService.login(authLoginDto);
    }

    @Post('/register')
    async register(@Body() authRegisterDto: AuthRegisterDto): Promise<AuthenticatedDto> {
        return await this.authService.register(authRegisterDto);
    }
}
