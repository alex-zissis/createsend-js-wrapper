import {CreateSendErrorCode} from './models/error.js';

interface CreateSendResponseBase {
    success: boolean;
    status: number;
}

interface CreateSendError {
    code: CreateSendErrorCode;
    message: string;
}

interface CreateSendErrorWithResultData<ResultData> extends CreateSendError {
    resultData: ResultData;
}

interface CreateSendErrorResponse<ErrorData extends CreateSendError> extends CreateSendResponseBase {
    success: false;
    data: ErrorData;
}

interface CreateSendSuccessResponse<ResponseData> extends CreateSendResponseBase {
    success: true;
    data: ResponseData;
}

type CreateSendResponse<ResponseData, ErrorData extends CreateSendError = CreateSendError> =
    | CreateSendSuccessResponse<ResponseData>
    | CreateSendErrorResponse<ErrorData>;

export type {CreateSendResponse, CreateSendError, CreateSendErrorWithResultData};
