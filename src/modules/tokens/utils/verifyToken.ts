////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { logger } from "@/config"
import jwt, { type JwtPayload } from "jsonwebtoken"
import type { TokenVerificationResult } from "../types/TokenVerificationResult"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * verifies a JWT
 * @param token - a token
 * @param secret - a secret key that was used to sign the token
 * @returns an object containing the verification result and the token's payload if it's valid
 */
export function verifyToken<TokenPayloadType = JwtPayload>(token: string, secret: string): TokenVerificationResult<TokenPayloadType> {
  try {
    const payload: JwtPayload | string = jwt.verify(token, secret)
    if (typeof payload === "string") { throw new Error("payload is a string (idk)") }
    return { status: "valid", payload: payload as TokenPayloadType }
  }
  catch (object: unknown) {
    const error = object as Error
    if (error.name === "TokenExpiredError") { return { status: "expired" } }
    if (error.name === "JsonWebTokenError") { return { status: "invalid" } }
    logger.failure("Error Verifying Token")
    logger.error(error)
    logger.trace(error)
    throw error
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
