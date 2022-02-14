import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import Activity from './schemas/activity.schema';
import Location from './schemas/location.schema';

@Module({
    imports: [ TypegooseModule.forFeature([ Activity, Location ]) ],
    providers: [ ActivitiesService ],
    controllers: [ ActivitiesController ],
})
export class ActivitiesModule {
}
