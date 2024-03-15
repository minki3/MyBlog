'use client';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationBar() {
  const url = usePathname();

  if (url === '/') return <></>;

  return (
    <nav className="py-6 flex ">
      <div className="font-bold text-2xl basis-[10%] text-center">minki3</div>
    </nav>
  );
}
