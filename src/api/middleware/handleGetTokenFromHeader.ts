////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { logger } from "@/config"
import type { Request, Response, NextFunction } from "express"
import type { InvalidHeaderResponseBody } from "@jbprophecy/hot-box"

import type {
  AccountAccessTokenRequestProps,
  AccountRefreshTokenRequestProps,
  ProfileAccessTokenRequestProps,
  ProfileRefreshTokenRequestProps
} from "@/api/types"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function handleGetAccountAccessTokenFromHeader(
  req: Request & AccountAccessTokenRequestProps,
  res: Response<InvalidHeaderResponseBody>,
  next: NextFunction
) {
  try {
    const headerName = "authorization"
    const headerValue: string | undefined = req.headers[headerName]
    if (typeof headerValue === "undefined") {
      res.status(400).json({
        type: "missing-header",
        name: headerName
      })
      return
    }
    if (!headerValue.startsWith("Bearer ")) {
      const expectedHeaderValue: string = "Bearer your_account_access_token"
      res.status(400).json({
        type: "invalid-header",
        name: headerName,
        value: headerValue,
        message: `The header "${headerName}" must have a value of "${expectedHeaderValue}".`
      })
      return
    }
    req.accountAccessToken = headerValue.split(" ")[1]
    next()
  }
  catch (object: unknown) {
    const error = object as Error
    logger.failure("Error Getting Account Access Token From Header")
    logger.error(error)
    logger.trace(error)
    next(error)
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function handleGetAccountRefreshTokenFromHeader(
  req: Request & AccountRefreshTokenRequestProps,
  res: Response<InvalidHeaderResponseBody>,
  next: NextFunction
) {
  try {
    const headerName = "authorization"
    const headerValue: string | undefined = req.headers[headerName]
    if (typeof headerValue === "undefined") {
      res.status(400).json({
        type: "missing-header",
        name: headerName
      })
      return
    }
    if (!headerValue.startsWith("Bearer ")) {
      const expectedHeaderValue: string = "Bearer your_account_refresh_token"
      res.status(400).json({
        type: "invalid-header",
        name: headerName,
        value: headerValue,
        message: `The header "${headerName}" must have a value of "${expectedHeaderValue}".`
      })
      return
    }
    req.accountRefreshToken = headerValue.split(" ")[1]
    next()
  }
  catch (object: unknown) {
    const error = object as Error
    logger.failure("Error Getting Account Refresh Token From Header")
    logger.error(error)
    logger.trace(error)
    next(error)
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function handleGetProfileAccessTokenFromHeader(
  req: Request & ProfileAccessTokenRequestProps,
  res: Response<InvalidHeaderResponseBody>,
  next: NextFunction
) {
  try {
    const headerName = "authorization"
    const headerValue: string | undefined = req.headers[headerName]
    if (typeof headerValue === "undefined") {
      res.status(400).json({
        type: "missing-header",
        name: headerName
      })
      return
    }
    if (!headerValue.startsWith("Bearer ")) {
      const expectedHeaderValue: string = "Bearer your_profile_access_token"
      res.status(400).json({
        type: "invalid-header",
        name: headerName,
        value: headerValue,
        message: `The header "${headerName}" must have a value of "${expectedHeaderValue}".`
      })
      return
    }
    req.profileAccessToken = headerValue.split(" ")[1]
    next()
  }
  catch (object: unknown) {
    const error = object as Error
    logger.failure("Error Getting Profile Access Token From Header")
    logger.error(error)
    logger.trace(error)
    next(error)
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function handleGetProfileRefreshTokenFromHeader(
  req: Request & ProfileRefreshTokenRequestProps,
  res: Response<InvalidHeaderResponseBody>,
  next: NextFunction
) {
  try {
    const headerName = "authorization"
    const headerValue: string | undefined = req.headers[headerName]
    if (typeof headerValue === "undefined") {
      res.status(400).json({
        type: "missing-header",
        name: headerName
      })
      return
    }
    if (!headerValue.startsWith("Bearer ")) {
      const expectedHeaderValue: string = "Bearer your_profile_refresh_token"
      res.status(400).json({
        type: "invalid-header",
        name: headerName,
        value: headerValue,
        message: `The header "${headerName}" must have a value of "${expectedHeaderValue}".`
      })
      return
    }
    req.profileRefreshToken = headerValue.split(" ")[1]
    next()
  }
  catch (object: unknown) {
    const error = object as Error
    logger.failure("Error Getting Profile Refresh Token From Header")
    logger.error(error)
    logger.trace(error)
    next(error)
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
