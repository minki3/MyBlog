'use client';
import React, { useState, useEffect } from 'react';
import { auth } from '../../../firebase';
import { useRouter } from 'next/navigation';

export default function WriteButton() {
  const router = useRouter();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  return (
    <button
      className=" font-bold border text-xl p-2"
      onClick={() => {
        if (user) {
          router.push('/write');
        } else {
          alert('로그인 후 이용');
        }
      }}
    >
      글쓰기
    </button>
  );
}
