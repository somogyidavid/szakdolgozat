import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { expirationTime } from '../../constants/constants';

@Module({
    imports: [ UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'ekkethesissecret',
            signOptions: {
                expiresIn: expirationTime.time
            }
        }) ],
    controllers: [ AuthController ],
    providers: [ AuthService, JwtStrategy ],
    exports: [ PassportModule, JwtModule ]
})
export class AuthModule {
}
