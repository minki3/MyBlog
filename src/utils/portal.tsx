import React, { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: { children: ReactElement }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted ? (
    createPortal(children, document.getElementById('portal') as HTMLElement)
  ) : (
    <></>
  );
};

export default Portal;
