import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as NProgress from 'nprogress';
import React from 'react';

export const useNProgress = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log(pathname)
  console.log(searchParams)

  React.useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);
};

export const useNProgressRouter = () => {
  const router = useRouter();

  const { push, back, replace } = router;

  router.push = (href, options) => {
    NProgress.start();
    push(href, options);
  };

  router.back = () => {
    NProgress.start();
    back();
  };

  router.replace = (href, options) => {
    NProgress.start();
    replace(href, options);
  };

  return router;
};
