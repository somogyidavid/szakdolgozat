import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/AuthRegisterDto';
import { AuthenticatedDto } from './dto/AuthenticatedDto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/UserDto';
import { AuthLoginDto } from './dto/AuthLoginDto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {
    }

    async login(authLoginDto: AuthLoginDto): Promise<AuthenticatedDto> {
        const user = await this.userService.findByEmail(authLoginDto.email);

        if (!user) {
            throw new HttpException('Ilyen felhasználónévvel nincs fiók regisztrálva!', HttpStatus.UNAUTHORIZED);
        }

        const correctPassword = await bcrypt.compare(authLoginDto.password, user.password);

        if (!correctPassword) {
            throw new HttpException('Nem megfelelő adatok!', HttpStatus.UNAUTHORIZED);
        }

        const userDto: UserDto = {
            _id: user._id,
            email: user.email,
            name: user.name,
            age: user.age,
            interests: user.interests,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            lastLogin: user.lastLogin
        };

        const token = this.generateToken(userDto);

        return {
            token,
            user: userDto
        };
    }

    async register(authRegisterDto: AuthRegisterDto): Promise<AuthenticatedDto> {
        let registeredUser = await this.userService.registerUser(authRegisterDto);

        const userDto: UserDto = {
            _id: registeredUser._id,
            email: registeredUser.email,
            name: '',
            age: 0,
            interests: [],
            createdAt: registeredUser.createdAt,
            updatedAt: registeredUser.updatedAt,
            lastLogin: registeredUser.lastLogin
        };

        let token = this.generateToken(userDto);

        return {
            token,
            user: userDto
        };
    }

    private generateToken(user: UserDto): string {
        return this.jwtService.sign(user);
    }
}
