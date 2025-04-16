////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import dotenv from "dotenv"
import { logger } from "@/config/logger"
import { processNumber, processString } from "@/utils/environment"
import { generateGlobalConfig, type GlobalConfig } from "@jbprophecy/hot-box"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

dotenv.config()
const NODE_ENV: string | undefined = process.env.NODE_ENV
if (NODE_ENV?.trim() === "production") { dotenv.config({ path: ".env.production" }) }
if (NODE_ENV?.trim() === "development") { dotenv.config({ path: ".env.development" }) }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type ServerEnvironment = {
  PORT: number
  CLIENT_ORIGIN: string
  DATABASE_URL: string
  ACCOUNT_ACCESS_TOKEN_SECRET: string
  ACCOUNT_REFRESH_TOKEN_SECRET: string
  PROFILE_ACCESS_TOKEN_SECRET: string
  PROFILE_REFRESH_TOKEN_SECRET: string
  ACCOUNT_ACCESS_TOKEN_DURATION: number
  ACCOUNT_REFRESH_TOKEN_DURATION: number
  PROFILE_ACCESS_TOKEN_DURATION: number
  PROFILE_REFRESH_TOKEN_DURATION: number
}

function processServerEnvironment(): ServerEnvironment {
  try {
    logger.attempt("Processing Server Environment")
    const serverEnvironment: ServerEnvironment = {
      PORT: processNumber("PORT", false) || 3000,
      CLIENT_ORIGIN: processString("CLIENT_ORIGIN", true),
      DATABASE_URL: processString("DATABASE_URL", true),
      ACCOUNT_ACCESS_TOKEN_SECRET: processString("ACCOUNT_ACCESS_TOKEN_SECRET", true),
      ACCOUNT_REFRESH_TOKEN_SECRET: processString("ACCOUNT_REFRESH_TOKEN_SECRET", true),
      PROFILE_ACCESS_TOKEN_SECRET: processString("PROFILE_ACCESS_TOKEN_SECRET", true),
      PROFILE_REFRESH_TOKEN_SECRET: processString("PROFILE_REFRESH_TOKEN_SECRET", true),
      ACCOUNT_ACCESS_TOKEN_DURATION: processNumber("ACCOUNT_ACCESS_TOKEN_DURATION", false) || 60 * 15,
      ACCOUNT_REFRESH_TOKEN_DURATION: processNumber("ACCOUNT_REFRESH_TOKEN_DURATION", false) || 60 * 60,
      PROFILE_ACCESS_TOKEN_DURATION: processNumber("PROFILE_ACCESS_TOKEN_DURATION", false) || 60 * 15,
      PROFILE_REFRESH_TOKEN_DURATION: processNumber("PROFILE_REFRESH_TOKEN_DURATION", false) || 60 * 60 * 24 * 30
    }
    logger.success("Successfully Processed Server Environment")
    return serverEnvironment
  }
  catch (object: unknown) {
    const error = object as Error
    logger.failure("Error Processing Server Environment")
    logger.error(error)
    logger.trace(error)
    throw error
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type ServerConfig = {
  PORT: number
  APP_NAME: string
  CLIENT_ORIGIN: string
  DATABASE_URL: string
  ACCOUNT_ACCESS_TOKEN_SECRET: string
  ACCOUNT_REFRESH_TOKEN_SECRET: string
  PROFILE_ACCESS_TOKEN_SECRET: string
  PROFILE_REFRESH_TOKEN_SECRET: string
  ACCOUNT_ACCESS_TOKEN_DURATION: number
  ACCOUNT_REFRESH_TOKEN_DURATION: number
  PROFILE_ACCESS_TOKEN_DURATION: number
  PROFILE_REFRESH_TOKEN_DURATION: number
}

function generateServerConfig(): ServerConfig {
  try {
    logger.attempt("Generating Server Config")
    const globalConfig: GlobalConfig = generateGlobalConfig()
    const serverEnvironment: ServerEnvironment = processServerEnvironment()
    const serverConfig: ServerConfig = {
      PORT: serverEnvironment.PORT,
      APP_NAME: globalConfig.APP_NAME,
      CLIENT_ORIGIN: serverEnvironment.CLIENT_ORIGIN,
      DATABASE_URL: serverEnvironment.DATABASE_URL,
      ACCOUNT_ACCESS_TOKEN_SECRET: serverEnvironment.ACCOUNT_ACCESS_TOKEN_SECRET,
      ACCOUNT_REFRESH_TOKEN_SECRET: serverEnvironment.ACCOUNT_REFRESH_TOKEN_SECRET,
      PROFILE_ACCESS_TOKEN_SECRET: serverEnvironment.PROFILE_ACCESS_TOKEN_SECRET,
      PROFILE_REFRESH_TOKEN_SECRET: serverEnvironment.PROFILE_REFRESH_TOKEN_SECRET,
      ACCOUNT_ACCESS_TOKEN_DURATION: serverEnvironment.ACCOUNT_ACCESS_TOKEN_DURATION,
      ACCOUNT_REFRESH_TOKEN_DURATION: serverEnvironment.ACCOUNT_ACCESS_TOKEN_DURATION,
      PROFILE_ACCESS_TOKEN_DURATION: serverEnvironment.ACCOUNT_ACCESS_TOKEN_DURATION,
      PROFILE_REFRESH_TOKEN_DURATION: serverEnvironment.ACCOUNT_ACCESS_TOKEN_DURATION
    }
    logger.success("Successfully Generated Server Config")
    return serverConfig
  }
  catch (object: unknown) {
    const error = object as Error
    logger.failure("Error Generating Server Config")
    logger.error(error)
    logger.trace(error)
    throw error
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export let serverConfig: ServerConfig
try { serverConfig = generateServerConfig() }
catch (object: unknown) { process.exit(0) }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
