////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { serverConfig } from "@/config"
import { verifyToken } from "./verifyToken"

import type {
  AccountAccessTokenVerificationResult,
  AccountRefreshTokenVerificationResult,
  ProfileAccessTokenVerificationResult,
  ProfileRefreshTokenVerificationResult
} from "../types/TokenVerificationResultTypes"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function verifyAccountAccessToken(token: string): AccountAccessTokenVerificationResult {
  return verifyToken(token, serverConfig.ACCOUNT_ACCESS_TOKEN_SECRET)
}

export function verifyAccountRefreshToken(token: string): AccountRefreshTokenVerificationResult {
  return verifyToken(token, serverConfig.ACCOUNT_REFRESH_TOKEN_SECRET)
}

export function verifyProfileAccessToken(token: string): ProfileAccessTokenVerificationResult {
  return verifyToken(token, serverConfig.PROFILE_ACCESS_TOKEN_SECRET)
}

export function verifyProfileRefreshToken(token: string): ProfileRefreshTokenVerificationResult {
  return verifyToken(token, serverConfig.PROFILE_REFRESH_TOKEN_SECRET)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
