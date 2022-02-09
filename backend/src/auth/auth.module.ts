import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [ UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'ekkethesissecret',
            signOptions: {
                expiresIn: '1h'
            }
        }) ],
    controllers: [ AuthController ],
    providers: [ AuthService, JwtStrategy ],
    exports: [ PassportModule, JwtModule ]
})
export class AuthModule {
}