import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { plugin, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

interface Location extends Base {
}

class Location extends TimeStamps {

    @prop()
    _id: Types.ObjectId;

    @prop()
    id: string;

    @prop()
    city?: string;

    @prop()
    formattedAddress?: string;

    @prop({
        required: [ true, 'A szélesség megadása kötelező!' ]
    })
    latitude!: number;

    @prop({
        required: [ true, 'A hosszúság megadása kötelező!' ]
    })
    longitude!: number;
}

export default Location;