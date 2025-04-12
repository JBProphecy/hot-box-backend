////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import type { JwtPayload } from "jsonwebtoken"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type TokenVerificationResult<TokenPayloadType = JwtPayload> = {
  status: "valid"
  payload: TokenPayloadType
} | {
  status: "expired" | "invalid"
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
