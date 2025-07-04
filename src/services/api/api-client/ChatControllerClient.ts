//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.20.0.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming
import * as Types from '../api-client.types';
import type { AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

import { throwException, isAxiosError } from '../api-client.types';
import { getAxios, getBaseUrl } from './helpers';

/**
 * Отправить сообщения определённым студентам
 * @return OK
 */
export function sendMessages(body: Types.SendMessageToStudentsRequest, config?: AxiosRequestConfig | undefined): Promise<Types.Response> {
    let url_ = getBaseUrl() + "/api/v1/chats/studentMessages";
      url_ = url_.replace(/[?&]$/, "");

    const content_ = Types.serializeSendMessageToStudentsRequest(body);

    let options_: AxiosRequestConfig = {
        ..._requestConfigSendMessages,
        ...config,
        data: content_,
        method: "POST",
        url: url_,
        headers: {
            ..._requestConfigSendMessages?.headers,
            "Content-Type": "application/json",
            "Accept": "*/*",
            ...config?.headers,
        }
    };

    return getAxios().request(options_).catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
            return _error.response;
        } else {
            throw _error;
        }
    }).then((_response: AxiosResponse) => {
        return processSendMessages(_response);
    });
}

function processSendMessages(response: AxiosResponse): Promise<Types.Response> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
        for (let k in response.headers) {
            if (response.headers.hasOwnProperty(k)) {
                _headers[k] = response.headers[k];
            }
        }
    }
    if (status === 409) {
        const _responseText = response.data;
        let result409: any = null;
        let resultData409  = _responseText;
        result409 = Types.initErrorResponse(resultData409);
        return throwException("Conflict", status, _responseText, _headers, result409);

    } else if (status === 400) {
        const _responseText = response.data;
        let result400: any = null;
        let resultData400  = _responseText;
        result400 = Types.initErrorResponse(resultData400);
        return throwException("Bad Request", status, _responseText, _headers, result400);

    } else if (status === 500) {
        const _responseText = response.data;
        let result500: any = null;
        let resultData500  = _responseText;
        result500 = Types.initErrorResponse(resultData500);
        return throwException("Internal Server Error", status, _responseText, _headers, result500);

    } else if (status === 401) {
        const _responseText = response.data;
        let result401: any = null;
        let resultData401  = _responseText;
        result401 = Types.initErrorResponse(resultData401);
        return throwException("Unauthorized", status, _responseText, _headers, result401);

    } else if (status === 404) {
        const _responseText = response.data;
        let result404: any = null;
        let resultData404  = _responseText;
        result404 = Types.initErrorResponse(resultData404);
        return throwException("Not Found", status, _responseText, _headers, result404);

    } else if (status === 200) {
        const _responseText = response.data;
        let result200: any = null;
        let resultData200  = _responseText;
        result200 = Types.initResponse(resultData200);
        return Promise.resolve<Types.Response>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<Types.Response>(null as any);
}

/**
 * Получить информацию о своем чате (для студента)
 * @return OK
 */
export function getMyChatInfo(config?: AxiosRequestConfig | undefined): Promise<Types.ChatInfoDto> {
    let url_ = getBaseUrl() + "/api/v1/chats/my";
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        ..._requestConfigGetMyChatInfo,
        ...config,
        method: "GET",
        url: url_,
        headers: {
            ..._requestConfigGetMyChatInfo?.headers,
            "Accept": "*/*",
            ...config?.headers,
        }
    };

    return getAxios().request(options_).catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
            return _error.response;
        } else {
            throw _error;
        }
    }).then((_response: AxiosResponse) => {
        return processGetMyChatInfo(_response);
    });
}

function processGetMyChatInfo(response: AxiosResponse): Promise<Types.ChatInfoDto> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
        for (let k in response.headers) {
            if (response.headers.hasOwnProperty(k)) {
                _headers[k] = response.headers[k];
            }
        }
    }
    if (status === 409) {
        const _responseText = response.data;
        let result409: any = null;
        let resultData409  = _responseText;
        result409 = Types.initErrorResponse(resultData409);
        return throwException("Conflict", status, _responseText, _headers, result409);

    } else if (status === 400) {
        const _responseText = response.data;
        let result400: any = null;
        let resultData400  = _responseText;
        result400 = Types.initErrorResponse(resultData400);
        return throwException("Bad Request", status, _responseText, _headers, result400);

    } else if (status === 500) {
        const _responseText = response.data;
        let result500: any = null;
        let resultData500  = _responseText;
        result500 = Types.initErrorResponse(resultData500);
        return throwException("Internal Server Error", status, _responseText, _headers, result500);

    } else if (status === 401) {
        const _responseText = response.data;
        let result401: any = null;
        let resultData401  = _responseText;
        result401 = Types.initErrorResponse(resultData401);
        return throwException("Unauthorized", status, _responseText, _headers, result401);

    } else if (status === 404) {
        const _responseText = response.data;
        let result404: any = null;
        let resultData404  = _responseText;
        result404 = Types.initErrorResponse(resultData404);
        return throwException("Not Found", status, _responseText, _headers, result404);

    } else if (status === 200) {
        const _responseText = response.data;
        let result200: any = null;
        let resultData200  = _responseText;
        result200 = Types.initChatInfoDto(resultData200);
        return Promise.resolve<Types.ChatInfoDto>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<Types.ChatInfoDto>(null as any);
}
let _requestConfigSendMessages: Partial<AxiosRequestConfig> | null;
export function getSendMessagesRequestConfig() {
  return _requestConfigSendMessages;
}
export function setSendMessagesRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigSendMessages = value;
}
export function patchSendMessagesRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigSendMessages = patch(_requestConfigSendMessages ?? {});
}

let _requestConfigGetMyChatInfo: Partial<AxiosRequestConfig> | null;
export function getGetMyChatInfoRequestConfig() {
  return _requestConfigGetMyChatInfo;
}
export function setGetMyChatInfoRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigGetMyChatInfo = value;
}
export function patchGetMyChatInfoRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigGetMyChatInfo = patch(_requestConfigGetMyChatInfo ?? {});
}