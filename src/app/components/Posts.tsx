// 'use client';
import { db } from '../../../firebase';
import { ref, onValue } from 'firebase/database';
// import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

export default async function Posts() {
  // const [test, setTest] = useState<any>();

  // useEffect(() => {
  //   const starCountRef = ref(db, 'posts/ck test1');
  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val().contents;
  //     console.log(data);
  //     setTest(data);
  //   });
  // }, []);
  // console.log(test);

  const starCountRef = await ref(db, 'posts/ck test1');

  let data;

  const fetchData = async () => {
    const starCountRef = ref(db, 'posts/ck test1');
    onValue(starCountRef, (snapshot) => {
      const postData = snapshot.val().contents;
      data = postData;
    });
  };

  fetchData();

  return <div>{data && parse(data)}</div>;
  // {test && parse(test)}
  // return <div></div>;
}
