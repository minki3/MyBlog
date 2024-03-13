'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import CustomEditor from '@/app/components/Custom-Editor';

export default function WriteContents() {
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
