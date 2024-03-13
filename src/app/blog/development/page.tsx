import ShowPosts from '@/app/components/ShowPosts';
import React from 'react';

interface Props {
  searchParams: { name: string; pathname: string };
}

export default function Development({ searchParams }: Props) {
  return (
    <div>
      <ShowPosts
        postTitle={searchParams.name}
        pathname={searchParams.pathname}
      />
    </div>
  );
}
