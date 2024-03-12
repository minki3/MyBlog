import React from 'react';

interface Props {
  searchParams: { name: string };
}

export default function Layout({ searchParams }: Props) {
  console.log('1', searchParams);
  return <div></div>;
}
