////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import type { TokenVerificationResult } from "./TokenVerificationResult"

import type {
  AccountAccessTokenPayload,
  AccountRefreshTokenPayload,
  ProfileAccessTokenPayload,
  ProfileRefreshTokenPayload
} from "./TokenPayloadTypes"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type AccountAccessTokenVerificationResult = TokenVerificationResult<AccountAccessTokenPayload>
export type AccountRefreshTokenVerificationResult = TokenVerificationResult<AccountRefreshTokenPayload>
export type ProfileAccessTokenVerificationResult = TokenVerificationResult<ProfileAccessTokenPayload>
export type ProfileRefreshTokenVerificationResult = TokenVerificationResult<ProfileRefreshTokenPayload>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
