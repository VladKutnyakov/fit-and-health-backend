import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import { dataSource } from '@/dataSource'
import { Users } from "@/db/entities/Users"
import { UsersProfiles } from "@/db/entities/UsersProfiles"
import { UsersParams } from "@/db/entities/UsersParams"
import { UsersSettings } from "@/db/entities/UsersSettings"
import { Tokens } from "@/db/entities/Tokens"

// http://localhost:3031/api/auth/register/
export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Обработка ошибки - не передана электронная почта
    if (!req.body.email) {
      return res.status(400).json({
        errors: [
          {
            field: 'email',
            errorMessage: 'Не указана электронная почта.'
          }
        ]
      })
    }

    // Обработка ошибки - не передан электронная номер телефона
    // if (!req.body.phone) {
    //   return res.status(400).json({
    //     errors: [
    //       {
    //         field: 'phone',
    //         errorMessage: 'Не указан номер телефона.'
    //       }
    //     ]
    //   })
    // }

    // Обработка ошибки - не передан пароль
    if (!req.body.password) {
      return res.status(400).json({
        errors: [
          {
            field: 'password',
            errorMessage: 'Не указан пароль.'
          }
        ]
      })
    }

    const User = await dataSource.getRepository(Users)
      .createQueryBuilder('users')
      .select([
        'users.id'
      ])
      .where(`users.email = '${req.body.email}'`)
      .getOne()
    // console.log(User)

    if (User) {
      return res.status(409).json({
        errors: [
          {
            field: 'email',
            errorMessage: 'Введенный E-mail уже используется. Попробуйте авторизироваться или используйте другой адрес электронной почты.'
          }
        ]
      })
    } else {
      // ТРАНЗАКЦИЯ
      const queryRunner = dataSource.createQueryRunner()
      await queryRunner.connect()

      await queryRunner.startTransaction()

      try {
        const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

        // Создание пользователя
        const CreatedUser = await dataSource.getRepository(Users)
          .createQueryBuilder('users')
          .insert()
          .into(Users)
          .values([
            {
              email: req.body.email,
              phone: req.body.phone,
              password: password,
            }
          ])
          .execute()
        // console.log(CreatedUser)

        // Создание данных с профилем пользователя
        const CreatedUserProfile = await dataSource.getRepository(UsersProfiles)
          .createQueryBuilder('usersProfiles')
          .insert()
          .into(UsersProfiles)
          .values([
            {
              user: dataSource.getRepository(Users).create({
                id: CreatedUser.identifiers[0].id,
              })
            }
          ])
          .execute()
        // console.log(CreatedUserProfile)

        // Создание данных с параметрами пользователя
        const CreatedUserParams = await dataSource.getRepository(UsersParams)
          .createQueryBuilder('usersParams')
          .insert()
          .into(UsersParams)
          .values([
            {
              user: dataSource.getRepository(Users).create({
                id: CreatedUser.identifiers[0].id,
              })
            }
          ])
          .execute()
        // console.log(CreatedUserParams)

        // Создание данных с настройками пользователя
        const CreatedUserSettings = await dataSource.getRepository(UsersSettings)
          .createQueryBuilder('usersSettings')
          .insert()
          .into(UsersSettings)
          .values([
            {
              user: dataSource.getRepository(Users).create({
                id: CreatedUser.identifiers[0].id,
              })
            }
          ])
          .execute()
        // console.log(CreatedUserSettings)

        const JwtKey: Secret = process.env.JWT || ''
        const AccessToken = jwt.sign({ id: CreatedUser.identifiers[0].id }, JwtKey, { expiresIn: '30d' })

        // Создание токена авторизации для пользователя
        const CreatedAccessToken = await dataSource.getRepository(Tokens)
            .createQueryBuilder('tokens')
            .insert()
            .into(Tokens)
            .values([
              {
                accessToken: AccessToken,
                user: dataSource.getRepository(Users).create({
                  id: CreatedUser.identifiers[0].id,
                })
              }
            ])
            .execute()
          // console.log(CreatedAccessToken)

        await queryRunner.commitTransaction()

        return res.status(200).json(CreatedAccessToken.identifiers[0].accessToken)
      } catch (error) {
        await queryRunner.rollbackTransaction()
  
        return res.status(400).json({
          errors: [
            {
              field: null,
              errorMessage: 'Ошибка при регистрации.'
            }
          ]
        })
      } finally {
        await queryRunner.release()
      }
    }
  } catch (error: any) {
    return res.status(500).json({
      errors: [
        {
          field: null,
          errorMessage: 'Неизвестная ошибка.'
        }
      ]
    })
  }
}

// СТАРЫЙ КОД с refreshToken

// const candidate = await dataSource.manager.findOne(Users, {where: {email: req.body.email}})

//   if (candidate) {
//     // console.log('Пользователь найден')

//     return res.status(409).json({
//       message: 'Введенный E-mail уже используется. Попробуйте авторизироваться или используйте другой адрес электронной почты.'
//     })
//   } else {
//     // console.log('Пользователь не найден')

//     // Создаем нового пользователя в БД
//     const CreatedUserAccessToken = await dataSource.transaction(async transactionalEntityManager => {

//       // Создать пользователя
//       const NewUser = new Users()
//       NewUser.email = req.body.email
//       NewUser.phone = req.body.phone
//       NewUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

//       const CreatedUser = await transactionalEntityManager.save(NewUser)

//       // Генерируем рефреш токен для созданного пользователя
//       const JwtRefreshKey: Secret = process.env.JWT_REFRESH || ''
//       const RefreshToken = jwt.sign({
//         id: CreatedUser.id,
//       }, JwtRefreshKey, {expiresIn: '30d'})

//       // Генерируем token для созданного пользователя
//       const JwtKey: Secret = process.env.JWT || ''
//       const AccessToken = jwt.sign({
//         id: CreatedUser.id,
//         refreshToken: RefreshToken
//       }, JwtKey, {expiresIn: '15m'})

//       // Создаем запись с токенами доступа для созданного пользователя
//       const CreatedTokens = new Tokens()
//       CreatedTokens.accessToken = AccessToken
//       // CreatedTokens.refreshToken = RefreshToken
//       CreatedTokens.user = CreatedUser

//       await transactionalEntityManager.save(CreatedTokens)

//       return AccessToken
//     })

//     return res.status(200).json(CreatedUserAccessToken)
//   }