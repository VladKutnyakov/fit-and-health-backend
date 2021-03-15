import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthService } from './auth/auth.service'
// import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private authService: AuthService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('api/v1/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body)
  }

  @Post('api/v1/auth/register')
  async register(@Request() req) {
    return this.authService.register(req.body)
  }

  // @UseGuards(JwtAuthGuard)
  @Get('api/v1/profile')
  getProfile(@Request() req) {
    return 11231231
  }
}
