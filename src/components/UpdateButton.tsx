'use client';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { auth } from '../../firebase';
import { useRouter } from 'next/navigation';
import { CreateAuthContext } from '@/context/AuthContext';

interface Props {
  uid: string;
  post: string;
}

export default function UpdateButton({ uid, post }: Props) {
  // const [userInformation, setUserInformation] = useState<any>();
  const { userInformation } = useContext(CreateAuthContext);

  const router = useRouter();

  const currentUid = userInformation?.uid;

  return (
    <button
      className="hover:font-bold"
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
