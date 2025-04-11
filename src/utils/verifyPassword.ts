////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { logger } from "@/config"
import argon2 from "argon2"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * verifies a plaintext password with a hashed password
 * @param storedPassword - the hashed password
 * @param givenPassword - the plaintext password
 * @returns a boolean value
 */
export async function verifyPassword(storedPassword: string, givenPassword: string): Promise<boolean> {
  try {
    logger.attempt("Verifying Password")
    return await argon2.verify(storedPassword, givenPassword)
  }
  catch (object: unknown) {
    const error = object as Error
    logger.failure("Error Verifying Password")
    logger.error(error)
    logger.trace(error)
    throw error
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
