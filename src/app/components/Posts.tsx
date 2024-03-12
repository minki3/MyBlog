// 'use client';
import React from 'react';
import { db } from '../../../firebase';
import { ref, onValue } from 'firebase/database';
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

  const starCountRef = ref(db, 'posts/ck test1');

  let data;

  onValue(starCountRef, (snapshot) => {
    const postData = snapshot.val().contents;
    data = postData;
  });

  return <>fdsafsafsa</>;
  // {test && parse(test)}
  // return <div></div>;
}
