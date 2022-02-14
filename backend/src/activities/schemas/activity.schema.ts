import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { plugin, pre, prop, Ref } from '@typegoose/typegoose';
import * as autoPopulate from 'mongoose-autopopulate';
import * as Validator from './validators/activity.validator';
import User from '../../users/schemas/user.schema';
import Location from './location.schema';

let activityValidator = new Validator.ActivityValidator();

interface Activity extends Base {
}

@pre<Activity>('validate', function (next: Function) {
    let activity = this;
    if (activity.startingDate > activity.endingDate) {
        this.invalidate('startingDate', 'A kezdődátum nem lehet később a végdátumnál!');
    }
    next();
})
@plugin(autoPopulate as any)
class Activity extends TimeStamps {

    @prop()
    _id: Types.ObjectId;

    @prop()
    id: string;

    @prop({
        autopopulate: { select: '-password' },
        required: [ true, 'A felhasználó megadása kötelező!' ],
        ref: () => User
    })
    user!: Ref<User>;

    @prop({
        required: [ true, 'Az esemény nevének megadása kötelező!' ],
        validate: [ {
            validator: activityValidator.nameLengthValidator,
            message: 'A név formátuma nem megfelelő!'
        } ]
    })
    name!: string;

    @prop({
        required: [ true, 'Kötelező megadni, hogy a program egész napos-e!' ]
    })
    isAllDay!: boolean;

    @prop({
        required: [ true, 'A kezdődátum megadása kötelező!' ]
    })
    startingDate!: Date;

    @prop({
        required: [ true, 'A végdátum megadása kötelező!' ]
    })
    endingDate!: Date;

    @prop({
        required: [ true, 'A lokáció megadása kötelező!' ],
        ref: () => Location,
        autopopulate: true
    })
    location: Ref<Location>;

    @prop()
    reminder?: number;

    @prop()
    timeType?: string;

    @prop()
    imageReference?: string;
}

export default Activity;