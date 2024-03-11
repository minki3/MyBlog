'use client';
import React from 'react';
import dynamic from 'next/dynamic';

export default function WriteContents() {
  const Editor = dynamic(() => import('@/app/components/Custom-Editor'), {
    ssr: false,
  });
  return (
    <>
      <Editor />
    </>
  );
}
