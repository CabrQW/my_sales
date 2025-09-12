import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { Secret,verify } from "jsonwebtoken";

interface ITokenPayload {
  iat: number,
  exp: number,
  sub: string
}

export default class AuthMiddleware {
  static execute(request: Request, response: Response, next:NextFunction): void {
    const authHearder = request.headers.authorization;

    if (!authHearder) {
      throw new AppError("JWT Token is missing", 401)
    }

    const [, token] = authHearder.split(' ')

    try {
      const decodaToken = verify(token, process.env.APP_SECRET as Secret)
      const {sub} = decodaToken as ITokenPayload
      request.user = {
        id: sub
      }

      return next()
    }catch (error){
      throw new AppError("Invalid JWT Token",401)
    }

  }
}