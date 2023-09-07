'use client';

import { CacheProvider } from '@emotion/react';
import {
  MantineProvider as BaseMantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  useEmotionCache,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';
import { NavigationProgress } from '@mantine/nprogress';

const MantineProvider = ({ children }: { children: React.ReactNode }) => {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  const [colorScheme, setColorScheme] = React.useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <CacheProvider value={cache}>
        <BaseMantineProvider
          withGlobalStyles
          withCSSVariables
          withNormalizeCSS
          inherit
          theme={{
            colorScheme,
            colors: {
              // override dark colors to change them for all components
              dark: [
                '#d5d7e0',
                '#acaebf',
                '#8c8fa3',
                '#666980',
                '#4d4f66',
                '#34354a',
                '#2b2c3d',
                '#1d1e30',
                '#0c0d21',
                '#01010a',
              ],
            },
          }}
        >
          <ModalsProvider>
            <NavigationProgress />
            <Notifications limit={5} position='bottom-right' />
            {children}
          </ModalsProvider>
        </BaseMantineProvider>
      </CacheProvider>
    </ColorSchemeProvider>
  );
};

export default MantineProvider;
