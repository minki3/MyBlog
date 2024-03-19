'use client';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { auth } from '../../../firebase';
import { useRouter } from 'next/navigation';

interface Props {
  uid: string;
  post: string;
}

export default function UpdateButton({ uid, post }: Props) {
  const [userInformation, setUserInformation] = useState<any>();

  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) return setUserInformation(user);
    });
  }, []);

  const currentUid = userInformation?.uid;

  return (
    <button
      onClick={() => {
        if (currentUid === uid) {
          router.push(`/write?post=${post}`);
        } else {
          alert('본인만 수정 가능');
        }
      }}
    >
      수정
    </button>
  );
}
