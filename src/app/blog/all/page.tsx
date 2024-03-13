import ShowPosts from '@/app/components/ShowPosts';
import React, { Suspense } from 'react';

interface Props {
  searchParams: { name: string; pathname: string };
}

export default function AllPosts({ searchParams }: Props) {
  const LazyShowPosts = React.lazy(() => import('@/app/components/ShowPosts'));
  return (
    <>
      <Suspense fallback={<div>...loading</div>}>
        <LazyShowPosts
          postTitle={searchParams.name}
          pathname={searchParams.pathname}
        />
      </Suspense>
    </>
  );
}
