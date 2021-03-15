import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  async login(user: any) {
    // Проверить пользователя в БД и если логин и пароль совпали вернуть токен
    return {
      token: this.jwtService.sign(user)
    }
  }
}
