'use client';

import { config } from '@/config';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import {
  QueryClientProvider as BaseQueryClientProvider,
  MutationCache,
  QueryCache,
  QueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { cacheTime: config.cacheTime, staleTime: config.staleTime } },
        queryCache: new QueryCache({ onError }),
        mutationCache: new MutationCache({ onError }),
      })
  );

  return (
    <BaseQueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      {children}
    </BaseQueryClientProvider>
  );
};

export default QueryClientProvider;

const onError = (error: Error) =>
  notifications.show({ message: error.message, color: 'red', icon: <IconX size='1.1rem' /> });
