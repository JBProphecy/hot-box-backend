////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { logger } from "@/config"
import type { Handler, NextFunction } from "express"
import type { CreateProfileRequest, CreateProfileResponse } from "./types"
import { handleGetAccountAccessTokenFromHeader, handleVerifyAccountAccessToken } from "@/api/middleware"
import { validateCreateProfileRequestBody, type CreateProfileRequestBodyValidationResult } from "@jbprophecy/hot-box"

import type { Profile } from "@/database/types"
import { getProfileByUsername, registerProfile } from "@/database/utils"
import { hashPassword } from "@/utils/passwords"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function handleValidateCreateProfileRequestBody(
  req: CreateProfileRequest,
  res: CreateProfileResponse,
  next: NextFunction
) {
  logger.attempt("Validating Body")
  const validation: CreateProfileRequestBodyValidationResult = validateCreateProfileRequestBody(req.body)
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

async function handleCreateProfile(
  req: CreateProfileRequest,
  res: CreateProfileResponse,
  next: NextFunction
) {
  try {
    // Verify Request Props
    if (!req.accountAccessToken) { throw new Error("Missing Account Access Token") }
    if (!req.accountAccessTokenPayload) { throw new Error("Missing Account Access Token Payload") }
    if (!req.validBody) { throw new Error("Missing Create Profile Valid Request Body") }

    // Check Username
    const existingProfile: Profile | null = await getProfileByUsername(req.validBody.username)
    if (existingProfile !== null) {
      const message: string = "Username is Already Registered"
      logger.warning(message)
      res.status(400).json({ type: "username-unavailable", message })
      return
    }
    logger.success("Username is Available")

    // Hash Password
    const hashedPassword: string = await hashPassword(req.validBody.password)

    // Register Profile
    await registerProfile({
      name: req.validBody.name,
      username: req.validBody.username,
      password: hashedPassword,
      accountID: req.accountAccessTokenPayload.accountID
    })

    // Successful Response
    res.status(201).json({ type: "success", message: "Sucessfully Created Profile" })
  }
  catch (object: unknown) { next(object as Error) }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CREATE_PROFILE_HANDLERS: Handler[] = [
  handleGetAccountAccessTokenFromHeader,
  handleVerifyAccountAccessToken,
  handleValidateCreateProfileRequestBody,
  handleCreateProfile
]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
