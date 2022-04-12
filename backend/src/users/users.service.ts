import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthRegisterDto } from "../auth/dto/AuthRegisterDto";
import { InjectModel } from "nestjs-typegoose";
import User from "./schemas/user.schema";
import { ReturnModelType } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { UpdateUserDto } from "./dto/UpdateUserDto";
import { DeleteUserDto } from "./dto/DeleteUserDto";
import * as bcrypt from "bcryptjs";
import { ChangePasswordDto } from "./dto/ChangePasswordDto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {
  }

  async findById(userId: Types.ObjectId): Promise<User> {
    return await this.userModel.findById(userId).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async registerUser(authRegisterDto: AuthRegisterDto): Promise<User> {
    let registeredUser = await this.userModel.create({
      _id: new Types.ObjectId(),
      email: authRegisterDto.email,
      password: authRegisterDto.password,
      name: "",
      age: 0,
      description: "",
      interests: []
    });

    return await this.userModel.findById(registeredUser._id).select("-password").exec();
  }

  async updateUser(userId: Types.ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    let user = await this.userModel.findById(userId);

    if (!user) {
      throw new BadRequestException("Nincs ilyen regisztrált felhasználó!");
    }

    return await this.userModel.findOneAndUpdate({ _id: userId }, updateUserDto, {
      new: true,
      context: "query"
    }).select({ "password": 0 }).exec();
  }

  async deleteUser(userId: Types.ObjectId, deleteUserDto: DeleteUserDto): Promise<User> {
    if (deleteUserDto.password !== deleteUserDto.passwordConfirm) {
      throw new BadRequestException("A jelszavak nem egyeznek meg!");
    }
    const user = await this.userModel.findById(userId);

    const correctPassword = await bcrypt.compare(deleteUserDto.password, user.password);

    if (!correctPassword) {
      throw new BadRequestException("A jelszó hibás!");
    }

    return await this.userModel.findOneAndRemove({ _id: userId }).select("-password").exec();
  }

  async changePassword(userId: Types.ObjectId, changePasswordDto: ChangePasswordDto): Promise<User> {
    if (changePasswordDto.newPassword !== changePasswordDto.newPasswordConfirm) {
      throw new BadRequestException("A jelszavak nem egyeznek meg!");
    }
    const user = await this.userModel.findById(userId);

    const correctPassword = await bcrypt.compare(changePasswordDto.password, user.password);

    if (!correctPassword) {
      throw new BadRequestException("A jelszó hibás!");
    }

    user.password = bcrypt.hashSync(changePasswordDto.newPassword, 10);
    return await this.userModel.findOneAndUpdate({ _id: userId }, user, {
      new: true,
      context: "query"
    }).select({ "password": 0 }).exec();
  }
}