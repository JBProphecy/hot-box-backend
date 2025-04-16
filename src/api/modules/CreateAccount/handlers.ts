////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { logger } from "@/config"

import type { Handler, NextFunction } from "express"
import type { CreateAccountRequest, CreateAccountResponse } from "./types"
import { validateCreateAccountRequestBody, type CreateAccountRequestBodyValidationResult } from "@jbprophecy/hot-box"

import type { Account } from "@/database/types"
import { getAccountByEmail, registerAccount } from "@/database/utils"
import { hashPassword } from "@/utils/passwords"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function handleValidateCreateAccountRequestBody(
  req: CreateAccountRequest,
  res: CreateAccountResponse,
  next: NextFunction
) {
  logger.attempt("Validating Body")
  const validation: CreateAccountRequestBodyValidationResult = validateCreateAccountRequestBody(req.body)
  if (!validation.success) {
    logger.warning("Body is Invalid")
    res.status(400).json({ type: "invalid-request-body", data: validation.data })
    return
  }
  logger.success("Body is Valid")
  req.validBody = validation.data
  next()
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function handleCreateAccount(
  req: CreateAccountRequest,
  res: CreateAccountResponse,
  next: NextFunction
) {
  try {
    // Verify Request Props
    if (!req.validBody) { throw new Error("Missing Create Account Valid Request Body") }

    // Check Email
    const existingAccount: Account | null = await getAccountByEmail(req.validBody.email)
    if (existingAccount !== null) {
      const message: string = "Email is Already Registered"
      logger.warning(message)
      res.status(400).json({ type: "email-unavailable", message })
      return
    }
    logger.success("Email is Available")

    // Hash Password
    const hashedPassword: string = await hashPassword(req.validBody.password)

    // Register Account
    await registerAccount({
      name: req.validBody.name,
      email: req.validBody.email,
      password: hashedPassword
    })

    // Successful Response
    res.status(201).json({ type: "success", message: "Sucessfully Created Account" })
  }
  catch (object: unknown) { next(object as Error) }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CREATE_ACCOUNT_HANDLERS: Handler[] = [
  handleValidateCreateAccountRequestBody,
  handleCreateAccount
]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
