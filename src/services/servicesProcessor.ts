import { config as Config } from '@/config';
import { HTTPMethod, StatusCode } from '@/types/enums';
import type { ResponseData } from '@/types/interfaces';
import QueryString from 'qs';
import type { IParams, IQuerystring, Services } from './types/interfaces';

// serviceProcessor(student,any)
export const serviceProcessor = async <T extends keyof ResponseData, K = any>(
  props: Services<T, K>
): Promise<ResponseData[T]> => {
  const {
    method = HTTPMethod.Get,
    serviceName,
    body,
    options: { externalUrl, params, querystring, signal, headers, revalidate } = {},
  } = props;
  const isFile = body instanceof FormData;
  const data = method === HTTPMethod.Get ? undefined : isFile ? body : JSON.stringify(body);
  const url = buildUrl(serviceName, params, querystring, externalUrl);
  const res = await fetch(url, {
    body: data,
    method,
    next: { revalidate },
    signal,
    headers: { ...(!isFile ? { 'Content-Type': 'application/json' } : {}), ...headers },
  });
  if (res.status === StatusCode.NoContent) return null;
  const response = await res?.json();
  if (!res.ok) throw response;
  return response;
};

const buildUrl = (
  serviceName: keyof ResponseData,
  params?: IParams<any>,
  querystring?: IQuerystring<any>,
  externalUrl?: boolean
): string => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const apiUrl = externalUrl ? '' : url.endsWith('/') ? url.slice(0, -1) : url;
  const newParams = buildParam(params);
  const newQuerystring = buildQuerystring(querystring);
  const api = Config?.[serviceName] || `/${serviceName}`;
  return `${apiUrl}${api}${newParams}${newQuerystring}`;
};

const buildParam = <T extends keyof ResponseData>(params: IParams<T>) => {
  const sub = Object.values(params || {})[0] as any;
  if (!sub) return '';
  if (sub.startsWith('/')) return sub;
  return `/${sub}`;
};

const buildQuerystring = <T extends keyof ResponseData>(querystring: IQuerystring<T>) => {
  const result = QueryString.stringify(querystring, { encodeValuesOnly: true });
  return result ? `?${result}` : '';
};
