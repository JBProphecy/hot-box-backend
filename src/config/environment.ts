////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { logger } from "@/config/logger"

import dotenv from "dotenv"
import { processString } from "@/utils/processString"
import { processNumber } from "@/utils/processNumber"

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
  // DEVICE_TOKEN_SECRET: string
  // ACCOUNT_TOKEN_SECRET: string
  // PROFILE_TOKEN_SECRET: string
  // ACCOUNT_ACCESS_TOKEN_DURATION: number
  // ACCOUNT_REFRESH_TOKEN_DURATION: number
  // PROFILE_ACCESS_TOKEN_DURATION: number
  // PROFILE_REFRESH_TOKEN_DURATION: number
}

function processServerEnvironment(): ServerEnvironment {
  try {
    logger.attempt("Processing Server Environment")
    const serverEnvironment: ServerEnvironment = {
      PORT: processNumber("PORT", false) || 3000,
      CLIENT_ORIGIN: processString("CLIENT_ORIGIN", true),
      // DEVICE_TOKEN_SECRET: processString("DEVICE_TOKEN_SECRET", true),
      // ACCOUNT_TOKEN_SECRET: processString("ACCOUNT_TOKEN_SECRET", true),
      // PROFILE_TOKEN_SECRET: processString("PROFILE_TOKEN_SECRET", true),
      // ACCOUNT_ACCESS_TOKEN_DURATION: processNumber("ACCOUNT_ACCESS_TOKEN_DURATION", true),
      // ACCOUNT_REFRESH_TOKEN_DURATION: processNumber("ACCOUNT_REFRESH_TOKEN_DURATION", true),
      // PROFILE_ACCESS_TOKEN_DURATION: processNumber("PROFILE_ACCESS_TOKEN_DURATION", true),
      // PROFILE_REFRESH_TOKEN_DURATION: processNumber("PROFILE_REFRESH_TOKEN_DURATION", true),
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
  app: {
    NAME: string
  }
  client: {
    ORIGIN: string
  }
  PORT: number
  // secrets: {
  //   DEVICE_TOKEN_SECRET: string
  //   ACCOUNT_TOKEN_SECRET: string
  //   PROFILE_TOKEN_SECRET: string
  // }
  // tokens: {
  //   ACCOUNT_ACCESS_TOKEN_DURATION: number
  //   ACCOUNT_REFRESH_TOKEN_DURATION: number
  //   PROFILE_ACCESS_TOKEN_DURATION: number
  //   PROFILE_REFRESH_TOKEN_DURATION: number
  // }
}

function generateServerConfig(): ServerConfig {
  try {
    logger.attempt("Generating Server Config")
    const globalConfig: GlobalConfig = generateGlobalConfig()
    const serverEnvironment: ServerEnvironment = processServerEnvironment()
    const serverConfig: ServerConfig = {
      app: {
        NAME: globalConfig.APP_NAME
      },
      client: {
        ORIGIN: serverEnvironment.CLIENT_ORIGIN
      },
      PORT: serverEnvironment.PORT,
      // secrets: {
      //   DEVICE_TOKEN_SECRET: serverEnvironment.DEVICE_TOKEN_SECRET,
      //   ACCOUNT_TOKEN_SECRET: serverEnvironment.ACCOUNT_TOKEN_SECRET,
      //   PROFILE_TOKEN_SECRET: serverEnvironment.PROFILE_TOKEN_SECRET
      // },
      // tokens: {
      //   ACCOUNT_ACCESS_TOKEN_DURATION: serverEnvironment.ACCOUNT_ACCESS_TOKEN_DURATION,
      //   ACCOUNT_REFRESH_TOKEN_DURATION: serverEnvironment.ACCOUNT_REFRESH_TOKEN_DURATION,
      //   PROFILE_ACCESS_TOKEN_DURATION: serverEnvironment.PROFILE_ACCESS_TOKEN_DURATION,
      //   PROFILE_REFRESH_TOKEN_DURATION: serverEnvironment.PROFILE_REFRESH_TOKEN_DURATION
      // }
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
