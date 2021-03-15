import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  findAll(): Promise<Users[]> {
    return this.usersRepository.find()
  }

  findOne(id: string): Promise<Users> {
    return this.usersRepository.findOne(id)
  }

  async create(user: any): Promise<void> {
    return await this.usersRepository.save(user)
  }

  async remove(id: number): Promise<any> {
    return await this.usersRepository.delete(id)
  }
}
