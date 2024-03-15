import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="p-4  flex flex-col">{children}</div>;
}
