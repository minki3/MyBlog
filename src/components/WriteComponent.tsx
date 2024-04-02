import React from 'react';
import dynamic from 'next/dynamic';

export default function WrtieComponent() {
  const Editor = dynamic(
    async () => await import('@/components/Custom-Editor'),
    {
      ssr: false,
    },
  );
  return <Editor />;
}
