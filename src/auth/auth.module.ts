import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
// import { JwtStrategy } from './strategies/jwt.strategy'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../constants'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 24 * 365 + 'h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  // providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
