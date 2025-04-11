////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import cors from "cors"
import http from "http"
import express, { type Express } from "express"
import cookieParser from "cookie-parser"

import { logger } from "@/config"
import { serverConfig } from "@/config"

import { handleNetworkLogs, handleRouteNotFound, handleServerError } from "@/api/middleware"
import { API_ROUTER } from "@/api/routers"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const application: Express = express()
export let httpServer: ReturnType<typeof http.createServer>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Main = () => {
  try {
    // Start Logs
    logger.start()

    // Initializing API
    logger.attempt("Initializing API")

    // Express Stuff
    application.use(cors({
      origin: [serverConfig.client.ORIGIN],
      credentials: true
    }))
    application.use(express.urlencoded({ extended: true }))
    application.use(express.json())
    application.use(cookieParser())

    // Custom Stuff
    application.use(handleNetworkLogs)
    application.use("/api", API_ROUTER)
    application.use(handleRouteNotFound)
    application.use(handleServerError)

    // Successfully Initialized API
    logger.success("Successfully Initialized API")
    logger.line()

    // Start Server
    const port: number = serverConfig.PORT
    logger.attempt("Starting Server")
    httpServer = http.createServer(application)
    httpServer.listen(port, () => {
      logger.success("Successfully Started Server")
      logger.line()
      logger.message(`Server Running on Port ${port}`)
      logger.line()
    })
  }
  catch (object: unknown) {
    const error = object as Error
    logger.error(error)
    logger.trace(error)
    logger.end()
    shutdown()
  }
}

export const shutdown = (callback?: any) => {
  if (httpServer) {
    logger.attempt("Attempting to Close Server")
    httpServer.close(callback)
    logger.success("Successfully Closed Server")
    logger.end()
    process.exit(0)
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Main()

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
