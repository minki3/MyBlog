'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { cloudDb } from '../../../firebase';
interface Props {
  postTitle: string;
  pathName: string;
}

export default function ShowPosts({ postTitle, pathName }: Props) {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      if (pathName === 'all') {
        const ref = await getDocs(collection(cloudDb, 'posts'));
        const newData: any = [];
        ref.forEach((doc) => {
          newData.push({ name: doc.id, data: doc.data() });
        });
        setData(newData);
      } else {
        const q = query(
          collection(cloudDb, 'posts'),
          where('category', '==', `${pathName}`),
        );

        const ref = await getDocs(q);

        const newData: any = [];

        ref.forEach((doc) => {
          newData.push({ name: doc.id, data: doc.data() });
        });
        setData(newData);
      }
    };
    getData();
  }, []);

  console.log(data);
  return (
    <div>
      <span className=" font-bold text-2xl">{postTitle}</span>

      <ul className="pl-4">
        {data &&
          data.map((item: any, idx: number) => {
            return (
              <Link href={`/blog/${item.name}`} key={idx}>
                <li className="m-4 border-b pb-4">
                  <span className="pr-4">{idx + 1}</span>
                  <span>{item.data.title}</span>
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}
