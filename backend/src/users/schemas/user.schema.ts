import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { plugin, pre, prop } from '@typegoose/typegoose';
import * as Validator from './validators/user.validator';
import * as UniqueValidator from 'mongoose-unique-validator';
import * as bcrypt from 'bcryptjs';
import { Types } from 'mongoose';

let userValidator = new Validator.UserValidator();

interface User extends TimeStamps {
}

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
class User implements Base {

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

    @prop()
    lastLogin!: Date;
}

export default User;