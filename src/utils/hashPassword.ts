////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { logger } from "@/config/logger"
import argon2 from "argon2"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * hashes a password
 * @param password - the password to be hashed
 * @returns the hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    logger.attempt("Hashing Password")
    const hashedPassword: string = await argon2.hash(password)
    logger.success("Successfully Hashed Password")
    return hashedPassword
  }
  catch (object: unknown) {
    const error = object as Error
    logger.failure("Error Hashing Password")
    logger.error(error)
    logger.trace(error)
    throw error
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
