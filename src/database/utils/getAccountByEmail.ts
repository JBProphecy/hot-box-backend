////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { logger, pool } from "@/config"
import type { QueryResult } from "pg"
import type { Account } from "@/database/types"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getAccountByEmail(email: string): Promise<Account | null> {
  try {
    logger.attempt("Getting Account By Email")
    const query: string = `
      SELECT *
      FROM accounts
      WHERE email = $1;
    `
    const values: string[] = [email]
    const res: QueryResult<Account> = await pool.query<Account>(query, values)
    if (res.rows.length === 0) { return null }
    else if (res.rows.length === 1) { return res.rows[0] }
    else { throw new Error("Multiple Accounts Found") }
  }
  catch (object: unknown) {
    const error = object as Error
    logger.failure("Error Getting Account By Email")
    logger.error(error)
    logger.trace(error)
    throw error
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
