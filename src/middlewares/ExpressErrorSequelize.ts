import { NextFunction, Request, Response } from 'express'
import { EmptyResultError, BaseError, ValidationError } from 'sequelize'
import { get } from 'lodash'

function msg(message: string) {
  return `Sequelize Error: ${message}`
}

async function ExpressErrorSequelize(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof BaseError) {
    if (err instanceof EmptyResultError) {
      return res.status(404).json({
        code: 404,
        message: msg('Data not found'),
      })
    }

    if (err instanceof ValidationError) {
      console.log('ERROR SEQUELIZE VALIDATION!!!')
      const errors: any[] = get(err, 'errors', [])
      let errorMessage = get(errors, '0.message', '')

      switch (errorMessage) {
        case 'UNIQUE_USERS_EMAIL must be unique':
          errorMessage = '[user.uniqueEmail]'
          break
        case 'UNIQUE_USERS_USERNAME must be unique':
          errorMessage = '[user.uniqueUsername]'
          break
        default:
          break
      }

      const dataError = {
        code: 400,
        message: errorMessage || err.message,
        errors: errors.reduce<any>((acc, curVal) => {
          acc[curVal.path] = curVal.message
          return acc
        }, {}),
      }

      console.log(dataError.message, dataError.errors)

      return res.status(400).json(dataError)
    }

    return res.status(500).json({
      code: 500,
      message: msg(err.message),
    })
  }

  next(err)
}

export default ExpressErrorSequelize
