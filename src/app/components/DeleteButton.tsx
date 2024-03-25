'use client';
import { CreateAuthContext } from '@/app/context/AuthContext';
import React, { useContext } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { cloudDb } from '../../../firebase';
import { useRouter } from 'next/navigation';

interface Props {
  uid: string;
  post: string;
}

export default function DeleteButton({ uid, post }: Props) {
  const { userInformation } = useContext(CreateAuthContext);
  const router = useRouter();

  return (
    <button
      className="hover:font-bold"
      onClick={async () => {
        if (userInformation?.uid === uid) {
          await deleteDoc(doc(cloudDb, 'posts', `${post}`));
          router.push(`/blog/all`);
          router.refresh();
        } else {
          alert('작성자만 삭제 가능합니다.');
        }
      }}
    >
      삭제
    </button>
  );
}
