import { config as Config } from '@/config';
import { HTTPMethod, StatusCode } from '@/types/enums';
import { ResponseData } from '@/types/interfaces';
import http from '@/utils/http';
import { cookies } from 'next/dist/client/components/headers';
import QueryString from 'qs';
import React from 'react';
import { setCookie } from 'cookies-next';
import { notifications } from '@mantine/notifications';

interface IGetApiServicesProps {
  page?: number;
  pageSize?: number;
  serviceName: keyof ResponseData;
}

//vip nhat ne > co jwt roi moi lam gi thi lam trigger apiheaders: {Authorization: `Bearer ${token}`,},
export const loginServices = (body: any) => {
  const url: string = `${process.env.NEXT_PUBLIC_API_URL}auth/local`;
  const res = http
    .post(url, body)
    .then((response) => {
      console.log('Well done!');
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);
      setCookie('profile', response.data.user);
      setCookie('token', response.data.jwt);
    })
    .catch((error) => {
      console.log('An error occurred:', error.response);
      throw new Error('Something bad happened');
    });
  return res;
};

//pageSize limit
export const getApiServices = ({ serviceName, pageSize, page }: IGetApiServicesProps) => {
  const url: string = `${process.env.NEXT_PUBLIC_API_URL}${serviceName}?pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  const res = http.get(url);
  return res;
};

export const getDetailServices = ({ serviceName, slug }: any) => {
  const url: string = `${process.env.NEXT_PUBLIC_API_URL}${serviceName}/${slug}`;
  const res = http.get(url);
  return res;
};

export const deleteOneServices = ({ serviceName, slug }: any) => {
  const url: string = `${process.env.NEXT_PUBLIC_API_URL}${serviceName}/${slug}`;
  const res = http.delete(url);
  return res;
};

export const createServices = ({ serviceName, body }: any) => {
  const url: string = `${process.env.NEXT_PUBLIC_API_URL}${serviceName}`;
  const res = http.post(url, body);
  return res;
};

// export interface Services<T extends keyof ResponseData, K = any> {
//   method?: string; // GET POST PUT DELETE
//   body?: any; // input value
//   serviceName: T; // students,schools
//   options?: Partial<ExtendsRequestProps<T>>;
// }

// export interface ExtendsRequestProps<T extends keyof ResponseData> {
//   params: string;
//   querystring: IQuerystring<T>;
//   auth: boolean;
//   timeout?: number;
//   externalUrl?: boolean;
//   headers: { [key: string]: string };
//   revalidate?: number;
//   signal?: AbortSignal;
// }

// export type IQuerystring<T extends keyof ResponseData> = {
//   populate?: object[] | IPopulate<ResponseData[T]['results'][number]>[];
//   sort?: any;
//   select?: string[];
//   limit?: number;
//   page?: number;
//   where?: any;
// };

// export interface IPopulate<T> {
//   path: keyof T;
//   populate?: IPopulate<T>;
//   select?: any;
//   match?: any;
//   options?: { skip?: number; limit?: number };
// }

// const buildParam = (params: string | undefined) => {
//     if (!params) return '';
//     if (params.startsWith('/')) return params;
//     return `/${params}`;
//   };

//   const buildQuerystring = <T extends keyof ResponseData>(querystring: IQuerystring<T> | undefined) => {
//     const result = QueryString.stringify(querystring, { encodeValuesOnly: true });
//     return result ? `?${result}` : '';
//   };

//  // build url from serviceName params

// const buildUrl = (
//     serviceName: keyof ResponseData,
//     params?: string,
//     querystring?: IQuerystring<any>,
//     externalUrl?: boolean,
//   ): string => {
//     const url = process.env.NEXT_PUBLIC_API_URL as any
//     const apiUrl = externalUrl ? '' : url.endsWith('/') ? url.slice(0, -1) : url;
//     const newParams = buildParam(params);
//     const newQuerystring = buildQuerystring(querystring);
//     const api = Config?.[serviceName] || `/${serviceName}`
//     return `${apiUrl}${api}${newParams}${newQuerystring}`;
//   };

// export const serviceProcessor = async <T extends keyof ResponseData, K = any>(
//   props: Services<T, K>
// ): Promise<ResponseData[T]> => {
//   const { serviceName, body, method = HTTPMethod.Get, options } = props || {};
//   const isFile = body instanceof FormData;
//   const data = method === HTTPMethod.Get ? undefined : isFile ? body : JSON.stringify(body);
//   const url = buildUrl(serviceName, params, querystring, externalUrl);

//   const res = await fetch(url, {
//     body: data,
//     method,
//     headers: { ...(!isFile ? { 'Content-Type': 'application/json' } : {}), ...headers },
//   });

//   if (res.status === StatusCode.NoContent) return null;
//   const response = await res?.json();
//   if (!res.ok) throw response;
//   return response;
// };
