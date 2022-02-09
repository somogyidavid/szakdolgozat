import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/AuthLoginDto';
import { AuthenticatedDto } from './dto/AuthenticatedDto';
import { AuthRegisterDto } from './dto/AuthRegisterDto';

@Controller('auth')
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
