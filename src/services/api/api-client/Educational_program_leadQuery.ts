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
import * as Client from './Educational_program_leadClient'
export { Client };
import type { AxiosRequestConfig } from 'axios';

export function createProgramLeadUrl(): string {
  let url_ = getBaseUrl() + "/api/v1/educational-program-lead";
  url_ = url_.replace(/[?&]$/, "");
  return url_;
}

export function createProgramLeadMutationKey(): MutationKey {
  return trimArrayEnd([
      'Educational_program_leadClient',
      'createProgramLead',
    ]);
}

/**
 * Создание руководителя
 * @return OK
 */
export function useCreateProgramLeadMutation<TContext>(options?: Omit<UseMutationOptions<Types.EducationalProgramLeadDto, unknown, Types.EducationalProgramLeadCreateDto, TContext>, 'mutationKey' | 'mutationFn'>): UseMutationResult<Types.EducationalProgramLeadDto, unknown, Types.EducationalProgramLeadCreateDto, TContext> {
  const key = createProgramLeadMutationKey();
  
  const metaContext = useContext(QueryMetaContext);
  options = addMetaToOptions(options, metaContext);
  
  return useMutation({
    ...options,
    mutationFn: (body: Types.EducationalProgramLeadCreateDto) => Client.createProgramLead(body),
    mutationKey: key,
  });
}