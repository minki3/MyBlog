import { useCallback, useEffect, useRef } from 'react';

export const useOutsideClick = (onClickOutside: () => void) => {
  const ref = useRef<any>(null);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current) {
        const inside = ref.current.contains(e.target);
        if (inside) return;
        onClickOutside();
      }
    },
    [onClickOutside, ref],
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  return ref;
};
