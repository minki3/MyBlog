import ShowPosts from '@/app/components/ShowPosts';
import React, { Suspense } from 'react';

export default function AllPosts() {
  const LazyShowPosts = React.lazy(() => import('@/app/components/ShowPosts'));
  return (
    <div className="h-[100%]">
      <Suspense fallback={<div>...loading</div>}>
        <LazyShowPosts postTitle="전체" pathName="all" />
      </Suspense>
    </div>
  );
}
