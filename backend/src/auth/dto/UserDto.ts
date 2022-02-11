import { Types } from 'mongoose';

export class UserDto {
    _id: Types.ObjectId;
    email: string;
    name: string;
    age: number;
    description: string;
    interests: string[];
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
}