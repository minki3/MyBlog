'use client';
import React, { Suspense } from 'react';

export default function WritePage() {
  const Editor = React.lazy(
    async () => await import('@/components/WriteComponent'),
  );
  return (
    <Suspense fallback={<div>...loading</div>}>
      <Editor />
    </Suspense>
  );
}
