import React from 'react';
import ShowPosts from '@/app/components/ShowPosts';

interface Props {
  searchParams: { name: string; pathname: string };
}

export default function Hobby({ searchParams }: Props) {
  return (
    <div>
      <ShowPosts
        postTitle={searchParams.name}
        pathname={searchParams.pathname}
      />
    </div>
  );
}
