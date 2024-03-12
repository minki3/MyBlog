import React from 'react';

interface Props {
  searchParams: any;
}

export default function AllPosts({ searchParams }: Props) {
  console.log(searchParams);
  return <div></div>;
}
