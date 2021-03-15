import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  async register (user: any) {
    console.log(user)
  }

  async login(user: any) {
    // Проверить пользователя в БД и если логин и пароль совпали вернуть токен
    console.log(user)

    return {
      token: this.jwtService.sign(user)
    }
  }
}
