import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/users')
  getUsers() {
    return this.usersService.findAll()
  }

  @Post('/create-user')
  createUsers() {
    return this.usersService.create({
      firstName: '1',
      lastName: '2',
      isActive: false
    })
  }

  @Post('/remove-user')
  removeUsers() {
    return this.usersService.remove(12)
  }
}
