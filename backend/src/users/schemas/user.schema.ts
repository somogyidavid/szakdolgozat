import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { modelOptions, plugin, pre, prop, Severity } from '@typegoose/typegoose';
import * as Validator from './validators/user.validator';
import * as UniqueValidator from 'mongoose-unique-validator';
import * as bcrypt from 'bcryptjs';
import { Types } from 'mongoose';

let userValidator = new Validator.UserValidator();

interface User extends Base {
}

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
@pre<User>('save', function (next: any) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    }
    user.password = bcrypt.hashSync(user.password, 10);
    next();
})
@plugin(UniqueValidator, {
    message: 'A(z) {VALUE} email már használatban van!'
})
class User extends TimeStamps {

    @prop()
    _id: Types.ObjectId;

    @prop()
    id: string;

    @prop({
        required: [ true, 'Az email megadása kötelező!' ],
        unique: true,
        validate: [ {
            validator: userValidator.emailValidator,
            message: 'Hibás email formátum!'
        } ]
    })
    email!: string;

    @prop({
        required: [ true, 'A jelszó megadása kötelező!' ],
        validate: [ {
            validator: userValidator.passwordValidator,
            message: 'A jelszó hossza minimum 8 karakter legyen!'
        } ]
    })
    password!: string;

    @prop({
        validate: [ {
            validator: userValidator.nameLengthValidator,
            message: 'A név hossza nem megfelelő!'
        } ]
    })
    name?: string;

    @prop()
    age?: number;

    @prop()
    interests?: string[];

    @prop()
    lastLogin!: Date;
}

export default User;