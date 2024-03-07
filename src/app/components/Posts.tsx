'use client';
import { db } from '../../../firebase';
import { ref, onValue } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

export default function Posts() {
  const [test, setTest] = useState<any>();

  useEffect(() => {
    const starCountRef = ref(db, 'posts/ck test1');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val().contents;
      console.log(data);
      setTest(data);
    });
  }, []);
  console.log(test);

  return <div>{test && parse(test)}</div>;
}
