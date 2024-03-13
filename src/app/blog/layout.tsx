import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="p-4 h-full">{children}</div>;
}
