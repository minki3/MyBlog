// 'use client';
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { cloudDb } from '../../../firebase';
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

//   console.log(data);
//   return (
//     <div>
//       <span className=" font-bold text-2xl">{postTitle}</span>

//       <ul className="pl-4">
//         {data &&
//           data.map((item: any, idx: number) => {
//             return (
//               <Link href={`/blog/${item.name}`} key={idx}>
//                 <li className="m-4 border-b pb-4">
//                   <span className="pr-4">{idx + 1}</span>
//                   <span>{item.data.title}</span>
//                 </li>
//               </Link>
//             );
//           })}
//       </ul>
//     </div>
//   );
// }
// csr

//ssr
import React from 'react';
import Link from 'next/link';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { cloudDb } from '../../../firebase';
import WriteButton from '@/app/components/WriteButton';
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
  }

  return (
    <div className="flex flex-col">
      <span className=" font-bold text-2xl">{postTitle}</span>
      <div className="flex flex-col h-[80vh]">
        <div className="basis-[80%]">
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
        <div className=" justify-end text-end">
          <WriteButton />
        </div>
      </div>
    </div>
  );
}
