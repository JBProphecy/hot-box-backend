////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { logger } from "@/config/logger"
import type { Request, Response, NextFunction } from "express"
import type { RouteNotFoundResponseBody } from "@jbprophecy/hot-box"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function handleRouteNotFound(
  req: Request,
  res: Response<RouteNotFoundResponseBody>,
  next: NextFunction
) {
  const message: string = "Route Not Found"
  logger.failure(message)
  res.status(404).json({ type: "route-not-found", message: message })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
