////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { logger, pool } from "@/config"
import type { QueryResult } from "pg"
import type { Account, AccountRegistrationData } from "@/database/types"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function registerAccount({ name, email, password }: AccountRegistrationData): Promise<Account> {
  try {
    logger.attempt("Registering Account")
    const query: string = `
      INSERT INTO accounts (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `
    const values: string[] = [name, email, password]
    const res: QueryResult<Account> = await pool.query<Account>(query, values)
    logger.success("Successfully Registered Account")
    if (res.rows.length !== 1) { throw new Error(`Expected One Row, Received ${res.rows.length}`)}
    return res.rows[0]
  }
  catch (object: unknown) {
    const error = object as Error
    logger.failure("Error Registering Account")
    logger.error(error)
    logger.trace(error)
    throw error
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
