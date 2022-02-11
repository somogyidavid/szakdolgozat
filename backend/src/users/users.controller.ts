import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/UpdateUserDto';
import User from './schemas/user.schema';
import { ReqUser } from '../auth/decorators/requser.decorator';
import { Types } from 'mongoose';
import { DeleteUserDto } from './dto/DeleteUserDto';
import { ChangePasswordDto } from './dto/ChangePasswordDto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:userId')
    async getUserById(@Param('userId') userId: string): Promise<User> {
        return await this.userService.findById(new Types.ObjectId(userId));
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/')
    async updateUser(@ReqUser('_id') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return await this.userService.updateUser(new Types.ObjectId(userId), updateUserDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/')
    async deleteUser(@ReqUser('_id') userId: string, @Body() deleteUserDto: DeleteUserDto): Promise<User> {
        return await this.userService.deleteUser(new Types.ObjectId(userId), deleteUserDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/changePassword')
    async changePassword(@ReqUser('_id') userId: string, @Body() changePasswordDto: ChangePasswordDto): Promise<User> {
        return await this.userService.changePassword(new Types.ObjectId(userId), changePasswordDto);
    }
}
