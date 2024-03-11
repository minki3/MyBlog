import React from 'react';

export default function Category() {
  const CATEGORY = ['전체', '취미', '개발'];
  return (
    <ul className="flex flex-col items-center basis-[10%]">
      {CATEGORY.map((item, idx) => {
        return (
          <li key={idx} className=" text-lg m-1">
            {item}
          </li>
        );
      })}
    </ul>
  );
}
