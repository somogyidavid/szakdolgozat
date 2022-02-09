import { Injectable } from '@nestjs/common';
import { AuthRegisterDto } from '../auth/dto/AuthRegisterDto';
import { InjectModel } from 'nestjs-typegoose';
import User from './schemas/user.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email }).exec();
    }

    async registerUser(authRegisterDto: AuthRegisterDto): Promise<User> {
        let registeredUser = await this.userModel.create({
            _id: new Types.ObjectId(),
            name: '',
            email: authRegisterDto.email,
            password: authRegisterDto.password
        });

        return await this.userModel.findById(registeredUser._id).select('-password').exec();
    }
}
