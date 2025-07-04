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
 * Получение информации текущего пользователя
 * @return OK
 */
export function getCurrentUser(config?: AxiosRequestConfig | undefined): Promise<Types.UserDetailsDto> {
    let url_ = getBaseUrl() + "/api/v1/user";
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        ..._requestConfigGetCurrentUser,
        ...config,
        method: "GET",
        url: url_,
        headers: {
            ..._requestConfigGetCurrentUser?.headers,
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
        return processGetCurrentUser(_response);
    });
}

function processGetCurrentUser(response: AxiosResponse): Promise<Types.UserDetailsDto> {
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
        result200 = Types.initUserDetailsDto(resultData200);
        return Promise.resolve<Types.UserDetailsDto>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<Types.UserDetailsDto>(null as any);
}

/**
 * Изменение информации текущего пользователя
 * @return OK
 */
export function updateCurrentUser(body: Types.UserEditDto, config?: AxiosRequestConfig | undefined): Promise<Types.UserShortDto> {
    let url_ = getBaseUrl() + "/api/v1/user";
      url_ = url_.replace(/[?&]$/, "");

    const content_ = Types.serializeUserEditDto(body);

    let options_: AxiosRequestConfig = {
        ..._requestConfigUpdateCurrentUser,
        ...config,
        data: content_,
        method: "PUT",
        url: url_,
        headers: {
            ..._requestConfigUpdateCurrentUser?.headers,
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
        return processUpdateCurrentUser(_response);
    });
}

function processUpdateCurrentUser(response: AxiosResponse): Promise<Types.UserShortDto> {
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
        result200 = Types.initUserShortDto(resultData200);
        return Promise.resolve<Types.UserShortDto>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<Types.UserShortDto>(null as any);
}

/**
 * Изменение электронной почты указанного пользователя
 * @return OK
 */
export function updateUserEmail(userId: string, body: Types.UserEmailEditDto, config?: AxiosRequestConfig | undefined): Promise<Types.UserShortDto> {
    let url_ = getBaseUrl() + "/api/v1/user/{userId}";
    if (userId === undefined || userId === null)
      throw new Error("The parameter 'userId' must be defined.");
    url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
      url_ = url_.replace(/[?&]$/, "");

    const content_ = Types.serializeUserEmailEditDto(body);

    let options_: AxiosRequestConfig = {
        ..._requestConfigUpdateUserEmail,
        ...config,
        data: content_,
        method: "PUT",
        url: url_,
        headers: {
            ..._requestConfigUpdateUserEmail?.headers,
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
        return processUpdateUserEmail(_response);
    });
}

function processUpdateUserEmail(response: AxiosResponse): Promise<Types.UserShortDto> {
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
        result200 = Types.initUserShortDto(resultData200);
        return Promise.resolve<Types.UserShortDto>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<Types.UserShortDto>(null as any);
}

/**
 * Изменение пароля текущего пользователя
 * @return OK
 */
export function updateCurrentUserPassword(body: Types.PasswordEditDto, config?: AxiosRequestConfig | undefined): Promise<Types.Response> {
    let url_ = getBaseUrl() + "/api/v1/user/password";
      url_ = url_.replace(/[?&]$/, "");

    const content_ = Types.serializePasswordEditDto(body);

    let options_: AxiosRequestConfig = {
        ..._requestConfigUpdateCurrentUserPassword,
        ...config,
        data: content_,
        method: "PUT",
        url: url_,
        headers: {
            ..._requestConfigUpdateCurrentUserPassword?.headers,
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
        return processUpdateCurrentUserPassword(_response);
    });
}

function processUpdateCurrentUserPassword(response: AxiosResponse): Promise<Types.Response> {
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
 * Регистрация
 * @return OK
 */
export function register(body: Types.RegistrationRequestDto, config?: AxiosRequestConfig | undefined): Promise<Types.TokenDto> {
    let url_ = getBaseUrl() + "/api/v1/user/register";
      url_ = url_.replace(/[?&]$/, "");

    const content_ = Types.serializeRegistrationRequestDto(body);

    let options_: AxiosRequestConfig = {
        ..._requestConfigRegister,
        ...config,
        data: content_,
        method: "POST",
        url: url_,
        headers: {
            ..._requestConfigRegister?.headers,
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
        return processRegister(_response);
    });
}

function processRegister(response: AxiosResponse): Promise<Types.TokenDto> {
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
        result200 = Types.initTokenDto(resultData200);
        return Promise.resolve<Types.TokenDto>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<Types.TokenDto>(null as any);
}

/**
 * Вход в аккаунт
 * @return OK
 */
export function login(body: Types.LoginCredentialsDto, config?: AxiosRequestConfig | undefined): Promise<Types.TokenDto> {
    let url_ = getBaseUrl() + "/api/v1/user/login";
      url_ = url_.replace(/[?&]$/, "");

    const content_ = Types.serializeLoginCredentialsDto(body);

    let options_: AxiosRequestConfig = {
        ..._requestConfigLogin,
        ...config,
        data: content_,
        method: "POST",
        url: url_,
        headers: {
            ..._requestConfigLogin?.headers,
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
        return processLogin(_response);
    });
}

function processLogin(response: AxiosResponse): Promise<Types.TokenDto> {
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
        result200 = Types.initTokenDto(resultData200);
        return Promise.resolve<Types.TokenDto>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<Types.TokenDto>(null as any);
}

/**
 * Получение информации пользователя
 * @return OK
 */
export function getUserById(id: string, config?: AxiosRequestConfig | undefined): Promise<Types.UserDetailsDto> {
    let url_ = getBaseUrl() + "/api/v1/user/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        ..._requestConfigGetUserById,
        ...config,
        method: "GET",
        url: url_,
        headers: {
            ..._requestConfigGetUserById?.headers,
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
        return processGetUserById(_response);
    });
}

function processGetUserById(response: AxiosResponse): Promise<Types.UserDetailsDto> {
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
        result200 = Types.initUserDetailsDto(resultData200);
        return Promise.resolve<Types.UserDetailsDto>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<Types.UserDetailsDto>(null as any);
}

/**
 * Получение списка пользователей
 * @param fullName (optional) ФИО пользователя (разрешается частичное совпадение)
 * @param userRole (optional) Роль пользователя
 * @param page (optional) Zero-based page index (0..N)
 * @param size (optional) The size of the page to be returned
 * @param sort (optional) Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
 * @return OK
 */
export function getUserList(fullName?: string | undefined, userRole?: Types.UserRole | undefined, page?: number | undefined, size?: number | undefined, sort?: string[] | undefined, config?: AxiosRequestConfig | undefined): Promise<Types.PagedListDtoUserDto> {
    let url_ = getBaseUrl() + "/api/v1/user/list?";
    if (fullName === null)
        throw new Error("The parameter 'fullName' cannot be null.");
    else if (fullName !== undefined)
        url_ += "fullName=" + encodeURIComponent("" + fullName) + "&";
    if (userRole === null)
        throw new Error("The parameter 'userRole' cannot be null.");
    else if (userRole !== undefined)
        url_ += "userRole=" + encodeURIComponent("" + userRole) + "&";
    if (page === null)
        throw new Error("The parameter 'page' cannot be null.");
    else if (page !== undefined)
        url_ += "page=" + encodeURIComponent("" + page) + "&";
    if (size === null)
        throw new Error("The parameter 'size' cannot be null.");
    else if (size !== undefined)
        url_ += "size=" + encodeURIComponent("" + size) + "&";
    if (sort === null)
        throw new Error("The parameter 'sort' cannot be null.");
    else if (sort !== undefined)
        sort && sort.forEach(item => { url_ += "sort=" + encodeURIComponent("" + item) + "&"; });
      url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
        ..._requestConfigGetUserList,
        ...config,
        method: "GET",
        url: url_,
        headers: {
            ..._requestConfigGetUserList?.headers,
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
        return processGetUserList(_response);
    });
}

function processGetUserList(response: AxiosResponse): Promise<Types.PagedListDtoUserDto> {
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
        result200 = Types.initPagedListDtoUserDto(resultData200);
        return Promise.resolve<Types.PagedListDtoUserDto>(result200);

    } else if (status !== 200 && status !== 204) {
        const _responseText = response.data;
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
    }
    return Promise.resolve<Types.PagedListDtoUserDto>(null as any);
}
let _requestConfigGetCurrentUser: Partial<AxiosRequestConfig> | null;
export function getGetCurrentUserRequestConfig() {
  return _requestConfigGetCurrentUser;
}
export function setGetCurrentUserRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigGetCurrentUser = value;
}
export function patchGetCurrentUserRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigGetCurrentUser = patch(_requestConfigGetCurrentUser ?? {});
}

let _requestConfigUpdateCurrentUser: Partial<AxiosRequestConfig> | null;
export function getUpdateCurrentUserRequestConfig() {
  return _requestConfigUpdateCurrentUser;
}
export function setUpdateCurrentUserRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigUpdateCurrentUser = value;
}
export function patchUpdateCurrentUserRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigUpdateCurrentUser = patch(_requestConfigUpdateCurrentUser ?? {});
}

let _requestConfigUpdateUserEmail: Partial<AxiosRequestConfig> | null;
export function getUpdateUserEmailRequestConfig() {
  return _requestConfigUpdateUserEmail;
}
export function setUpdateUserEmailRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigUpdateUserEmail = value;
}
export function patchUpdateUserEmailRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigUpdateUserEmail = patch(_requestConfigUpdateUserEmail ?? {});
}

let _requestConfigUpdateCurrentUserPassword: Partial<AxiosRequestConfig> | null;
export function getUpdateCurrentUserPasswordRequestConfig() {
  return _requestConfigUpdateCurrentUserPassword;
}
export function setUpdateCurrentUserPasswordRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigUpdateCurrentUserPassword = value;
}
export function patchUpdateCurrentUserPasswordRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigUpdateCurrentUserPassword = patch(_requestConfigUpdateCurrentUserPassword ?? {});
}

let _requestConfigRegister: Partial<AxiosRequestConfig> | null;
export function getRegisterRequestConfig() {
  return _requestConfigRegister;
}
export function setRegisterRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigRegister = value;
}
export function patchRegisterRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigRegister = patch(_requestConfigRegister ?? {});
}

let _requestConfigLogin: Partial<AxiosRequestConfig> | null;
export function getLoginRequestConfig() {
  return _requestConfigLogin;
}
export function setLoginRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigLogin = value;
}
export function patchLoginRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigLogin = patch(_requestConfigLogin ?? {});
}

let _requestConfigGetUserById: Partial<AxiosRequestConfig> | null;
export function getGetUserByIdRequestConfig() {
  return _requestConfigGetUserById;
}
export function setGetUserByIdRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigGetUserById = value;
}
export function patchGetUserByIdRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigGetUserById = patch(_requestConfigGetUserById ?? {});
}

let _requestConfigGetUserList: Partial<AxiosRequestConfig> | null;
export function getGetUserListRequestConfig() {
  return _requestConfigGetUserList;
}
export function setGetUserListRequestConfig(value: Partial<AxiosRequestConfig>) {
  _requestConfigGetUserList = value;
}
export function patchGetUserListRequestConfig(patch: (value: Partial<AxiosRequestConfig>) => Partial<AxiosRequestConfig>) {
  _requestConfigGetUserList = patch(_requestConfigGetUserList ?? {});
}