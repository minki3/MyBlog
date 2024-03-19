// 'use client';
// import React, { Suspense, useEffect, useState } from 'react';
// import Link from 'next/link';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { cloudDb } from '../../../firebase';
// import WriteButton from '@/app/components/WriteButton';

// interface Props {
//   postTitle: string;
//   pathName: string;
// }

// export default function ShowPosts({ postTitle, pathName }: Props) {
//   const [data, setData] = useState<any>([]);

//   useEffect(() => {
//     const getData = async () => {
//       if (pathName === 'all') {
//         const ref = await getDocs(collection(cloudDb, 'posts'));
//         const newData: any = [];
//         ref.forEach((doc) => {
//           newData.push({ name: doc.id, data: doc.data() });
//         });
//         setData(newData);
//       } else {
//         const q = query(
//           collection(cloudDb, 'posts'),
//           where('category', '==', `${pathName}`),
//         );

//         const ref = await getDocs(q);

//         const newData: any = [];

//         ref.forEach((doc) => {
//           newData.push({ name: doc.id, data: doc.data() });
//         });
//         setData(newData);
//       }
//     };
//     getData();
//   }, []);

//   return (
//     <div>
//       <span className=" font-bold text-2xl">{postTitle}</span>

//       <ul className="pl-4">
//         {data &&
//           data
//             .sort(
//               (a: any, b: any) =>
//                 b.data.timestamp.seconds - a.data.timestamp.seconds,
//             )
//             .map((item: any, idx: number) => {
//               return (
//                 <Link href={`/blog/${item.name}`} key={idx}>
//                   <li className="m-4 border-b pb-4">
//                     <span className="pr-4">{idx + 1}</span>
//                     <span>{item.data.title}</span>
//                   </li>
//                 </Link>
//               );
//             })}
//       </ul>
//       <WriteButton />
//     </div>
//   );
// }
// csr;

//ssr
import React from 'react';
import Link from 'next/link';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { cloudDb } from '../../../firebase';
import WriteButton from '@/app/components/WriteButton';
import moment from 'moment';
import { dateFormat } from '@/app/utils/dateFormat';
interface Props {
  postTitle: string;
  pathName: string;
}

export default async function ShowPosts({ postTitle, pathName }: Props) {
  let data;

  if (pathName === 'all') {
    const ref = await getDocs(collection(cloudDb, 'posts'));
    const newData: any = [];
    ref.forEach((doc) => {
      newData.push({ name: doc.id, data: doc.data() });
    });
    data = newData;
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

    data = newData;
    console.log('1', data);
  }

  console.log(
    '22',
    moment(data[0]?.data?.timestamp.toDate()).format('HH:mm:ss'),
  );

  return (
    <div className="flex flex-col">
      <span className=" font-bold text-2xl">{postTitle}</span>
      <div className="flex flex-col h-[80vh]">
        <div className="basis-[80%]">
          <ul className="pl-4">
            {data &&
              data
                .sort(
                  (a: any, b: any) =>
                    b.data.timestamp.seconds - a.data.timestamp.seconds,
                )
                .map((item: any, idx: number) => {
                  const date = dateFormat(item);
                  console.log(date);
                  return (
                    <Link href={`/blog/${item.name}`} key={idx}>
                      <li className="m-4 border-b pb-4 flex justify-between">
                        <div>
                          <span className="pr-4">{idx + 1}</span>
                          <span>{item.data.title}</span>
                        </div>
                        <span className=" font-thin text-sm">{date}</span>
                      </li>
                    </Link>
                  );
                })}
          </ul>
        </div>
        <div className=" justify-end text-end">
          <WriteButton />
        </div>
      </div>
    </div>
  );
}
