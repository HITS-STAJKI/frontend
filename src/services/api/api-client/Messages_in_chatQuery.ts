//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.20.0.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming
import * as Types from '../api-client.types';
import { useQuery, useMutation } from '@tanstack/react-query';
import type { UseQueryResult, QueryFunctionContext, UseQueryOptions, QueryClient, QueryKey, MutationKey, UseMutationOptions, UseMutationResult, QueryMeta, MutationMeta } from '@tanstack/react-query';
import { trimArrayEnd, isParameterObject, getBaseUrl, addMetaToOptions } from './helpers';
import type { QueryMetaContextValue } from 'react-query-swagger';
import { QueryMetaContext } from 'react-query-swagger';
import { useContext } from 'react';
import * as Client from './Messages_in_chatClient'
export { Client };
import type { AxiosRequestConfig } from 'axios';

export type EditMessageMessages_in_chatQueryParameters = {
  chatId: string ;
  messageId: string ;
}

export type DeleteMessageMessages_in_chatQueryParameters = {
  chatId: string ;
  messageId: string ;
}

export type SendMessageMessages_in_chatQueryParameters = {
  chatId: string ;
}

export type GetMessagesListMessages_in_chatQueryParameters = {
  chatId: string ;
  page?: number | undefined ;
  size?: number | undefined ;
  sort?: string[] | undefined ;
}

export function editMessageUrl(chatId: string, messageId: string): string {
  let url_ = getBaseUrl() + "/api/v1/chats/{chatId}/messages/{messageId}";
if (chatId === undefined || chatId === null)
  throw new Error("The parameter 'chatId' must be defined.");
url_ = url_.replace("{chatId}", encodeURIComponent("" + chatId));
if (messageId === undefined || messageId === null)
  throw new Error("The parameter 'messageId' must be defined.");
url_ = url_.replace("{messageId}", encodeURIComponent("" + messageId));
  url_ = url_.replace(/[?&]$/, "");
  return url_;
}

export function editMessageMutationKey(chatId: string, messageId: string): MutationKey {
  return trimArrayEnd([
      'Messages_in_chatClient',
      'editMessage',
      chatId as any,
      messageId as any,
    ]);
}

/**
 * Отредактировать сообщение в чате
 * @param chatId Id чата
 * @param messageId Id сообщения
 * @return OK
 */
export function useEditMessageMutation<TContext>(chatId: string, messageId: string, options?: Omit<UseMutationOptions<Types.MessageDto, unknown, Types.EditMessageRequest, TContext>, 'mutationKey' | 'mutationFn'>): UseMutationResult<Types.MessageDto, unknown, Types.EditMessageRequest, TContext> {
  const key = editMessageMutationKey(chatId, messageId);
  
  const metaContext = useContext(QueryMetaContext);
  options = addMetaToOptions(options, metaContext);
  
  return useMutation({
    ...options,
    mutationFn: (body: Types.EditMessageRequest) => Client.editMessage(chatId, messageId, body),
    mutationKey: key,
  });
}
  
type EditMessage__MutationParameters = EditMessageMessages_in_chatQueryParameters & {
  body: Types.EditMessageRequest;
}

/**
 * Отредактировать сообщение в чате
 * @param chatId Id чата
 * @param messageId Id сообщения
 * @return OK
 */
export function useEditMessageMutationWithParameters<TContext>(options?: Omit<UseMutationOptions<Types.MessageDto, unknown, EditMessage__MutationParameters, TContext>, 'mutationKey' | 'mutationFn'> & { parameters?: EditMessageMessages_in_chatQueryParameters}): UseMutationResult<Types.MessageDto, unknown, EditMessage__MutationParameters, TContext> {
  const key = editMessageMutationKey(options?.parameters?.chatId!, options?.parameters?.messageId!);
  
  const metaContext = useContext(QueryMetaContext);
  options = addMetaToOptions(options, metaContext);
  
return useMutation({
  ...options, 
  mutationFn: (data: EditMessage__MutationParameters) => Client.editMessage(data.chatId ?? options?.parameters?.chatId!, data.messageId ?? options?.parameters?.messageId!, data.body),
  mutationKey: key,
});
}
  
export function deleteMessageUrl(chatId: string, messageId: string): string {
  let url_ = getBaseUrl() + "/api/v1/chats/{chatId}/messages/{messageId}";
if (chatId === undefined || chatId === null)
  throw new Error("The parameter 'chatId' must be defined.");
url_ = url_.replace("{chatId}", encodeURIComponent("" + chatId));
if (messageId === undefined || messageId === null)
  throw new Error("The parameter 'messageId' must be defined.");
url_ = url_.replace("{messageId}", encodeURIComponent("" + messageId));
  url_ = url_.replace(/[?&]$/, "");
  return url_;
}

export function deleteMessageMutationKey(chatId: string, messageId: string): MutationKey {
  return trimArrayEnd([
      'Messages_in_chatClient',
      'deleteMessage',
      chatId as any,
      messageId as any,
    ]);
}

/**
 * Удалить сообщение из чата
 * @param chatId Id чата
 * @param messageId Id сообщения
 * @return OK
 */
export function useDeleteMessageMutation<TContext>(chatId: string, messageId: string, options?: Omit<UseMutationOptions<Types.Response, unknown, void, TContext>, 'mutationKey' | 'mutationFn'>): UseMutationResult<Types.Response, unknown, void, TContext> {
  const key = deleteMessageMutationKey(chatId, messageId);
  
  const metaContext = useContext(QueryMetaContext);
  options = addMetaToOptions(options, metaContext);
  
  return useMutation({
    ...options,
    mutationFn: () => Client.deleteMessage(chatId, messageId),
    mutationKey: key,
  });
}
  
type DeleteMessage__MutationParameters = DeleteMessageMessages_in_chatQueryParameters

/**
 * Удалить сообщение из чата
 * @param chatId Id чата
 * @param messageId Id сообщения
 * @return OK
 */
export function useDeleteMessageMutationWithParameters<TContext>(options?: Omit<UseMutationOptions<Types.Response, unknown, DeleteMessage__MutationParameters, TContext>, 'mutationKey' | 'mutationFn'> & { parameters?: DeleteMessageMessages_in_chatQueryParameters}): UseMutationResult<Types.Response, unknown, DeleteMessage__MutationParameters, TContext> {
  const key = deleteMessageMutationKey(options?.parameters?.chatId!, options?.parameters?.messageId!);
  
  const metaContext = useContext(QueryMetaContext);
  options = addMetaToOptions(options, metaContext);
  
return useMutation({
  ...options, 
  mutationFn: (data: DeleteMessage__MutationParameters) => Client.deleteMessage(data.chatId ?? options?.parameters?.chatId!, data.messageId ?? options?.parameters?.messageId!),
  mutationKey: key,
});
}
  
export function sendMessageUrl(chatId: string): string {
  let url_ = getBaseUrl() + "/api/v1/chats/{chatId}/messages";
if (chatId === undefined || chatId === null)
  throw new Error("The parameter 'chatId' must be defined.");
url_ = url_.replace("{chatId}", encodeURIComponent("" + chatId));
  url_ = url_.replace(/[?&]$/, "");
  return url_;
}

export function sendMessageMutationKey(chatId: string): MutationKey {
  return trimArrayEnd([
      'Messages_in_chatClient',
      'sendMessage',
      chatId as any,
    ]);
}

/**
 * Отправить сообщение в чат
 * @param chatId Id чата
 * @return OK
 */
export function useSendMessageMutation<TContext>(chatId: string, options?: Omit<UseMutationOptions<Types.MessageDto, unknown, Types.SendMessageRequest, TContext>, 'mutationKey' | 'mutationFn'>): UseMutationResult<Types.MessageDto, unknown, Types.SendMessageRequest, TContext> {
  const key = sendMessageMutationKey(chatId);
  
  const metaContext = useContext(QueryMetaContext);
  options = addMetaToOptions(options, metaContext);
  
  return useMutation({
    ...options,
    mutationFn: (body: Types.SendMessageRequest) => Client.sendMessage(chatId, body),
    mutationKey: key,
  });
}
  
type SendMessage__MutationParameters = SendMessageMessages_in_chatQueryParameters & {
  body: Types.SendMessageRequest;
}

/**
 * Отправить сообщение в чат
 * @param chatId Id чата
 * @return OK
 */
export function useSendMessageMutationWithParameters<TContext>(options?: Omit<UseMutationOptions<Types.MessageDto, unknown, SendMessage__MutationParameters, TContext>, 'mutationKey' | 'mutationFn'> & { parameters?: SendMessageMessages_in_chatQueryParameters}): UseMutationResult<Types.MessageDto, unknown, SendMessage__MutationParameters, TContext> {
  const key = sendMessageMutationKey(options?.parameters?.chatId!);
  
  const metaContext = useContext(QueryMetaContext);
  options = addMetaToOptions(options, metaContext);
  
return useMutation({
  ...options, 
  mutationFn: (data: SendMessage__MutationParameters) => Client.sendMessage(data.chatId ?? options?.parameters?.chatId!, data.body),
  mutationKey: key,
});
}
  
export function getMessagesListUrl(chatId: string, page?: number | undefined, size?: number | undefined, sort?: string[] | undefined): string {
  let url_ = getBaseUrl() + "/api/v1/chats/{chatId}/messages/list?";
if (chatId === undefined || chatId === null)
  throw new Error("The parameter 'chatId' must be defined.");
url_ = url_.replace("{chatId}", encodeURIComponent("" + chatId));
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
  return url_;
}

let getMessagesListDefaultOptions: Omit<UseQueryOptions<Types.PagedListDtoMessageDto, unknown, Types.PagedListDtoMessageDto>, 'queryKey' | 'queryFn'> & Partial<Pick<UseQueryOptions<Types.PagedListDtoMessageDto, unknown, Types.PagedListDtoMessageDto>, 'queryFn'>> = {
};
export function getGetMessagesListDefaultOptions() {
  return getMessagesListDefaultOptions;
};
export function setGetMessagesListDefaultOptions(options: typeof getMessagesListDefaultOptions) {
  getMessagesListDefaultOptions = options;
}

export function getMessagesListQueryKey(dto: GetMessagesListMessages_in_chatQueryParameters): QueryKey;
export function getMessagesListQueryKey(chatId: string, page?: number | undefined, size?: number | undefined, sort?: string[] | undefined): QueryKey;
export function getMessagesListQueryKey(...params: any[]): QueryKey {
  if (params.length === 1 && isParameterObject(params[0])) {
    const { chatId, page, size, sort,  } = params[0] as GetMessagesListMessages_in_chatQueryParameters;

    return trimArrayEnd([
        'Messages_in_chatClient',
        'getMessagesList',
        chatId as any,
        page as any,
        size as any,
        sort as any,
      ]);
  } else {
    return trimArrayEnd([
        'Messages_in_chatClient',
        'getMessagesList',
        ...params
      ]);
  }
}
export function __getMessagesList(context: QueryFunctionContext, axiosConfig?: AxiosRequestConfig | undefined) {
  return Client.getMessagesList(
      context.queryKey[2] as string,       context.queryKey[3] as number | undefined,       context.queryKey[4] as number | undefined,       context.queryKey[5] as string[] | undefined,axiosConfig    );
}

export function useGetMessagesListQuery<TSelectData = Types.PagedListDtoMessageDto, TError = unknown>(dto: GetMessagesListMessages_in_chatQueryParameters, options?: Omit<UseQueryOptions<Types.PagedListDtoMessageDto, TError, TSelectData>, 'queryKey'>, axiosConfig?: Partial<AxiosRequestConfig>): UseQueryResult<TSelectData, TError>;
/**
 * Получить список сообщений чата
 * @param chatId Id чата
 * @param page (optional) Zero-based page index (0..N)
 * @param size (optional) The size of the page to be returned
 * @param sort (optional) Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
 * @return OK
 */
export function useGetMessagesListQuery<TSelectData = Types.PagedListDtoMessageDto, TError = unknown>(chatId: string, page?: number | undefined, size?: number | undefined, sort?: string[] | undefined, options?: Omit<UseQueryOptions<Types.PagedListDtoMessageDto, TError, TSelectData>, 'queryKey'>, axiosConfig?: Partial<AxiosRequestConfig>): UseQueryResult<TSelectData, TError>;
export function useGetMessagesListQuery<TSelectData = Types.PagedListDtoMessageDto, TError = unknown>(...params: any []): UseQueryResult<TSelectData, TError> {
  let options: UseQueryOptions<Types.PagedListDtoMessageDto, TError, TSelectData> | undefined = undefined;
  let axiosConfig: AxiosRequestConfig |undefined = undefined;
  let chatId: any = undefined;
  let page: any = undefined;
  let size: any = undefined;
  let sort: any = undefined;
  
  if (params.length > 0) {
    if (isParameterObject(params[0])) {
      ({ chatId, page, size, sort,  } = params[0] as GetMessagesListMessages_in_chatQueryParameters);
      options = params[1];
      axiosConfig = params[2];
    } else {
      [chatId, page, size, sort, options, axiosConfig] = params;
    }
  }

  const metaContext = useContext(QueryMetaContext);
  options = addMetaToOptions(options, metaContext);

  return useQuery<Types.PagedListDtoMessageDto, TError, TSelectData>({
    queryFn: axiosConfig ? (context) => __getMessagesList(context, axiosConfig) : __getMessagesList,
    queryKey: getMessagesListQueryKey(chatId, page, size, sort),
    ...getMessagesListDefaultOptions as unknown as Omit<UseQueryOptions<Types.PagedListDtoMessageDto, TError, TSelectData>, 'queryKey'>,
    ...options,
  });
}
/**
 * Получить список сообщений чата
 * @param chatId Id чата
 * @param page (optional) Zero-based page index (0..N)
 * @param size (optional) The size of the page to be returned
 * @param sort (optional) Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
 * @return OK
 */
export function setGetMessagesListData(queryClient: QueryClient, updater: (data: Types.PagedListDtoMessageDto | undefined) => Types.PagedListDtoMessageDto, chatId: string, page?: number | undefined, size?: number | undefined, sort?: string[] | undefined) {
  queryClient.setQueryData(getMessagesListQueryKey(chatId, page, size, sort),
    updater
  );
}

/**
 * Получить список сообщений чата
 * @param chatId Id чата
 * @param page (optional) Zero-based page index (0..N)
 * @param size (optional) The size of the page to be returned
 * @param sort (optional) Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
 * @return OK
 */
export function setGetMessagesListDataByQueryId(queryClient: QueryClient, queryKey: QueryKey, updater: (data: Types.PagedListDtoMessageDto | undefined) => Types.PagedListDtoMessageDto) {
  queryClient.setQueryData(queryKey, updater);
}