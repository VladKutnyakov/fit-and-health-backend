import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/entity/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService
  ) {}

  async register(user: any): Promise<void> {
    console.log(user)
    return await this.usersRepository.save(user)
  }

  async login(user: any) {
    // Проверить пользователя в БД и если логин и пароль совпали вернуть токен
    console.log(user)

    return {
      token: this.jwtService.sign(user)
    }
  }
}
