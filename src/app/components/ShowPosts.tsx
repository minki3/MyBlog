'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { ref, child, get } from 'firebase/database';
import {
  DocumentData,
  collection,
  getDocs,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { cloudDb } from '../../../firebase';
interface Props {
  postTitle: string;
  pathname: string;
}

export default function ShowPosts({ postTitle, pathname }: Props) {
  const [data, setData] = useState<any>([]);

  // useEffect(() => {
  //   const dbRef = ref(db);

  //   // all 일때의 get
  //   if (pathname == 'all') {
  //     get(child(dbRef, `posts/${pathname}`))
  //       .then((snapshot) => {
  //         if (snapshot.exists()) {
  //           const development = snapshot.val().development;
  //           const hobby = snapshot.val().hobby;
  //           setData([...data, hobby, development]);
  //         } else {
  //           console.log('No data available');
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }

  //   // all이 아닐 때의 get
  //   get(child(dbRef, `posts/all/${pathname}`))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         setData([...data, snapshot.val()]);
  //       } else {
  //         console.log('No data available');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  // console.log(data);

  // const getContents = async () => {
  //   await getDocs(collection(cloudDb, `posts`)).then((result) => {
  //     setData(result);
  //   });
  // };

  const q = query(
    collection(cloudDb, 'posts'),
    where('category', '==', 'hobby'),
  );
  useEffect(() => {
    const getData = async () => {
      const ref = await getDocs(q);
      ref.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });
    };
    getData();
  }, []);
  console.log(data);
  return (
    <div>
      <span className=" font-bold text-2xl">{postTitle}</span>

      <ul className="pl-4">
        {/* {data &&
          data.map((item: any, idx: number) => {
            console.log(Object.keys(item));
            console.log(item);
            return (
              <li key={idx} className="m-4 border-b pb-4">
                <span className="pr-4">{idx + 1}</span>
                <span>{Object.keys(item)}</span>
              </li>
            );
          })} */}
      </ul>
    </div>
  );
}
