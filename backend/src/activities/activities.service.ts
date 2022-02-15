import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import Activity from './schemas/activity.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { CreateActivityDto } from './dto/CreateActivityDto';
import { CreateLocationDto } from './dto/CreateLocationDto';
import Location from './schemas/location.schema';
import { UpdateActivityDto } from './dto/UpdateActivityDto';
import { RequestActivitiesDto } from './dto/RequestActivitiesDto';
import { ajax } from 'rxjs/ajax';
import axios from 'axios';

@Injectable()
export class ActivitiesService {
    constructor(@InjectModel(Activity) private readonly activityModel: ReturnModelType<typeof Activity>,
                @InjectModel(Location) private readonly locationModel: ReturnModelType<typeof Location>) {
    }

    async fetchAllActivity(userId: Types.ObjectId): Promise<Activity[]> {
        return await this.activityModel.find({ user: userId }).exec();
    }

    async fetchActivityById(userId: Types.ObjectId, activityId: Types.ObjectId): Promise<Activity> {
        return await this.activityModel.findOne({ user: userId, _id: activityId }).exec();
    }

    async createActivity(userId: Types.ObjectId, createActivityDto: CreateActivityDto, locationDto: CreateLocationDto): Promise<Activity> {
        let newActivity = new this.activityModel({
            _id: new Types.ObjectId(),
            user: userId,
            ...createActivityDto
        });

        let location = new this.locationModel({
            _id: new Types.ObjectId(),
            ...locationDto
        });

        newActivity.location = location;

        await newActivity.save();
        await location.save();
        return newActivity;
    }

    async updateActivity(activityId: Types.ObjectId, updateActivityDto: UpdateActivityDto, locationDto: CreateLocationDto): Promise<Activity> {
        let updatedActivity = await this.activityModel.findById(activityId);

        if (!updatedActivity) {
            throw new BadRequestException('Nincs ilyen program!');
        }

        updatedActivity.name = updateActivityDto.name ? updateActivityDto.name : updatedActivity.name;
        updatedActivity.isAllDay = updateActivityDto.isAllDay ? updateActivityDto.isAllDay : updatedActivity.isAllDay;
        updatedActivity.startingDate = updateActivityDto.startingDate ? updateActivityDto.startingDate : updatedActivity.startingDate;
        updatedActivity.endingDate = updateActivityDto.endingDate ? updateActivityDto.endingDate : updatedActivity.endingDate;
        updatedActivity.reminder = updateActivityDto.reminder ? updateActivityDto.reminder : updatedActivity.reminder;
        updatedActivity.timeType = updateActivityDto.timeType ? updateActivityDto.timeType : updatedActivity.timeType;

        if (locationDto) {
            let location = await this.locationModel.findById(updatedActivity.location);
            location.city = locationDto.city ? locationDto.city : location.city;
            location.formattedAddress = locationDto.formattedAddress ? locationDto.formattedAddress : location.formattedAddress;
            location.latitude = locationDto.latitude ? locationDto.latitude : location.latitude;
            location.longitude = locationDto.longitude ? locationDto.longitude : location.longitude;
            await location.save();

            updatedActivity.location = location;
        }

        await updatedActivity.save();
        return updatedActivity;
    }

    async deleteActivity(activityId: Types.ObjectId): Promise<Activity> {
        let activity = await this.activityModel.findById(activityId);

        if (!activity) {
            throw new BadRequestException('Nincs ilyen program!');
        }

        await this.locationModel.findOneAndRemove({ _id: activity.location._id });

        return await this.activityModel.findOneAndRemove({ _id: activityId }).exec();
    }

    async getActivities(requestActivitiesDto: RequestActivitiesDto): Promise<Object> {
        const {
            latitude,
            longitude,
            types,
            radius,
            language,
            keyword,
            minPrice,
            maxPrice,
            openNow
        } = requestActivitiesDto;

        const activitiesUri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&radius=${radius}&type=${types}&language=${language}&key=${process.env.GOOGLE_API_KEY}`;
        const response = await axios.get(activitiesUri);

        return response.data;
    }
}
