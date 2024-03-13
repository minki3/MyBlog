'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const INTRODUCE = [{ pathname: '', name: 'Introduce' }];

export const CATEGORY = [
  {
    category: 'blog',
    subCategory: [
      { pathname: 'all', name: '전체' },
      { pathname: 'development', name: '개발' },
      { pathname: 'hobby', name: '취미' },
    ],
  },
];

export default function Category() {
  const [state, setState] = useState<string>();
  const router = usePathname();
  const path = router.split('/')[1];
  const blogPath = router.split('/')[2];

  return (
    <ul className="flex flex-col items-center basis-[10%]">
      {INTRODUCE.map((item, idx) => {
        const { pathname, name } = item;
        return (
          <Link key={idx} href={`/${pathname}`} className="mb-4">
            <li
              className={`${pathname === path && `font-bold`}`}
              onClick={() => {
                setState(pathname);
              }}
            >
              {name}
            </li>
          </Link>
        );
      })}

      {CATEGORY.map((item, idx) => {
        const { category, subCategory } = item;
        return (
          <li key={idx}>
            <span
              className={`${category === state && 'font-bold'} text-lg m-1`}
              onClick={() => {
                setState(category);
              }}
            >
              {category}
            </span>
            {category === state &&
              subCategory.map((item, sidx) => {
                const { pathname, name } = item;
                return (
                  <Link
                    key={sidx}
                    href={{
                      pathname: `/${category}/${pathname}`,
                      query: { name: `${name}`, pathname: `${pathname}` },
                    }}
                    // as={`/${category}/${pathname}`}
                    className="flex flex-col items-center"
                  >
                    <span
                      key={sidx}
                      className={`${blogPath === pathname && ` font-bold`}`}
                    >
                      {name}
                    </span>
                  </Link>
                );
              })}
          </li>
        );
      })}
    </ul>
  );
}
