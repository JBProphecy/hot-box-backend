////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { logger } from "@/config"
import type { Request, Response, NextFunction } from "express"
import type { InvalidTokenResponseBody } from "@jbprophecy/hot-box"

import type {
  AccountAccessTokenVerificationRequestProps,
  AccountRefreshTokenVerificationRequestProps,
  ProfileAccessTokenVerificationRequestProps,
  ProfileRefreshTokenVerificationRequestProps
} from "@/api/types"

import {
  verifyAccountAccessToken, type AccountAccessTokenVerificationResult,
  verifyAccountRefreshToken, type AccountRefreshTokenVerificationResult,
  verifyProfileAccessToken, type ProfileAccessTokenVerificationResult,
  verifyProfileRefreshToken, type ProfileRefreshTokenVerificationResult
} from "@/modules/tokens"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function handleVerifyAccountAccessToken(
  req: Request & AccountAccessTokenVerificationRequestProps,
  res: Response<InvalidTokenResponseBody>,
  next: NextFunction
) {
  try {
    const token: string | undefined = req.accountAccessToken
    if (typeof token === "undefined") { throw new Error("Missing Token") }

    const result: AccountAccessTokenVerificationResult = verifyAccountAccessToken(token)
    switch (result.status) {
      case "valid":
        req.accountAccessTokenPayload = result.payload
        next()
      case "expired":
        res.status(401).json({
          type: "expired-token",
          message: "account access token is expired."
        })
        return
      case "invalid":
        res.status(401).json({
          type: "invalid-token",
          message: "account access token is invalid."
        })
        return
      default: throw new Error("Unhandled Token Verification Status")
    }
  }
  catch (object: unknown) {
    const error = object as Error
    logger.failure("Error Verifying Account Access Token")
    logger.error(error)
    logger.trace(error)
    next(error)
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function handleVerifyAccountRefreshToken(
  req: Request & AccountRefreshTokenVerificationRequestProps,
  res: Response<InvalidTokenResponseBody>,
  next: NextFunction
) {
  try {
    const token: string | undefined = req.accountRefreshToken
    if (typeof token === "undefined") { throw new Error("Missing Token") }

    const result: AccountRefreshTokenVerificationResult = verifyAccountRefreshToken(token)
    switch (result.status) {
      case "valid":
        req.accountRefreshTokenPayload = result.payload
        next()
      case "expired":
        res.status(401).json({
          type: "expired-token",
          message: "account refresh token is expired."
        })
        return
      case "invalid":
        res.status(401).json({
          type: "invalid-token",
          message: "account refresh token is invalid."
        })
        return
      default: throw new Error("Unhandled Token Verification Status")
    }
  }
  catch (object: unknown) {
    const error = object as Error
    logger.failure("Error Verifying Account Refresh Token")
    logger.error(error)
    logger.trace(error)
    next(error)
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function handleVerifyProfileAccessToken(
  req: Request & ProfileAccessTokenVerificationRequestProps,
  res: Response<InvalidTokenResponseBody>,
  next: NextFunction
) {
  try {
    const token: string | undefined = req.profileAccessToken
    if (typeof token === "undefined") { throw new Error("Missing Token") }

    const result: ProfileAccessTokenVerificationResult = verifyProfileAccessToken(token)
    switch (result.status) {
      case "valid":
        req.profileAccessTokenPayload = result.payload
        next()
      case "expired":
        res.status(401).json({
          type: "expired-token",
          message: "profile access token is expired."
        })
        return
      case "invalid":
        res.status(401).json({
          type: "invalid-token",
          message: "profile access token is invalid."
        })
        return
      default: throw new Error("Unhandled Token Verification Status")
    }
  }
  catch (object: unknown) {
    const error = object as Error
    logger.failure("Error Verifying Profile Access Token")
    logger.error(error)
    logger.trace(error)
    next(error)
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function handleVerifyProfileRefreshToken(
  req: Request & ProfileRefreshTokenVerificationRequestProps,
  res: Response<InvalidTokenResponseBody>,
  next: NextFunction
) {
  try {
    const token: string | undefined = req.profileRefreshToken
    if (typeof token === "undefined") { throw new Error("Missing Token") }

    const result: ProfileRefreshTokenVerificationResult = verifyProfileRefreshToken(token)
    switch (result.status) {
      case "valid":
        req.profileRefreshTokenPayload = result.payload
        next()
      case "expired":
        res.status(401).json({
          type: "expired-token",
          message: "profile refresh token is expired."
        })
        return
      case "invalid":
        res.status(401).json({
          type: "invalid-token",
          message: "profile refresh token is invalid."
        })
        return
      default: throw new Error("Unhandled Token Verification Status")
    }
  }
  catch (object: unknown) {
    const error = object as Error
    logger.failure("Error Verifying Profile Refresh Token")
    logger.error(error)
    logger.trace(error)
    next(error)
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
