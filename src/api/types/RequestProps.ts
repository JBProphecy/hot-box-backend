////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import type {
  AccountAccessTokenPayload,
  AccountRefreshTokenPayload,
  ProfileAccessTokenPayload,
  ProfileRefreshTokenPayload
} from "@/modules/tokens"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type ValidBodyRequestProps<ValidBodyType> = { validBody?: ValidBodyType }

export type AccountAccessTokenRequestProps = { accountAccessToken?: string }
export type AccountRefreshTokenRequestProps = { accountRefreshToken?: string }
export type ProfileAccessTokenRequestProps = { profileAccessToken?: string }
export type ProfileRefreshTokenRequestProps = { profileRefreshToken?: string }

type AccountAccessTokenPayloadRequestProps = { accountAccessTokenPayload?: AccountAccessTokenPayload }
type AccountRefreshTokenPayloadRequestProps = { accountRefreshTokenPayload?: AccountRefreshTokenPayload }
type ProfileAccessTokenPayloadRequestProps = { profileAccessTokenPayload?: ProfileAccessTokenPayload }
type ProfileRefreshTokenPayloadRequestProps = { profileRefreshTokenPayload?: ProfileRefreshTokenPayload }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type AccountAccessTokenVerificationRequestProps =
& AccountAccessTokenRequestProps
& AccountAccessTokenPayloadRequestProps

export type AccountRefreshTokenVerificationRequestProps =
& AccountRefreshTokenRequestProps
& AccountRefreshTokenPayloadRequestProps

export type ProfileAccessTokenVerificationRequestProps =
& ProfileAccessTokenRequestProps
& ProfileAccessTokenPayloadRequestProps

export type ProfileRefreshTokenVerificationRequestProps =
& ProfileRefreshTokenRequestProps
& ProfileRefreshTokenPayloadRequestProps

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
