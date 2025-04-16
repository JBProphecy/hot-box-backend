////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import type { Request, Response } from "express"
import type { CreateProfileRawRequestBody, CreateProfileResponseBody, CreateProfileValidRequestBody } from "@jbprophecy/hot-box"
import type { AccountAccessTokenVerificationRequestProps, ValidBodyRequestProps } from "@/api/types"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type CreateProfileRequestProps =
& AccountAccessTokenVerificationRequestProps
& ValidBodyRequestProps<CreateProfileValidRequestBody>

export type CreateProfileRequest = Request<{}, {}, CreateProfileRawRequestBody> & CreateProfileRequestProps
export type CreateProfileResponse = Response<CreateProfileResponseBody>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
