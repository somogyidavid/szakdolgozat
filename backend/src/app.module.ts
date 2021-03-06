import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ActivitiesModule } from './activities/activities.module';
import { TypegooseConnectionOptions, TypegooseModule } from 'nestjs-typegoose';
import { LocationsModule } from './locations/locations.module';
import { TrainModule } from './train/train.module';


@Module({
    imports: [ ConfigModule.forRoot({
        envFilePath: '.env'
    }), TypegooseModule.forRoot(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    } as TypegooseConnectionOptions), UsersModule, AuthModule, ActivitiesModule, LocationsModule, TrainModule ],
    controllers: [ AppController ],
    providers: [ AppService ],
})
export class AppModule {
}
