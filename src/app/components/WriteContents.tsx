'use client';
import React from 'react';
import dynamic from 'next/dynamic';

export default async function WriteContents() {
  const Editor = dynamic(
    async () => await import('@/app/components/Custom-Editor'),
    {
      ssr: false,
    },
  );
  return (
    <>
      <Editor />
    </>
  );
}
