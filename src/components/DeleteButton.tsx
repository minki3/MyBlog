'use client';
import { CreateAuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { cloudDb } from '../../firebase';
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
          const deletePost = confirm('삭제하시겠습니까 ?');
          if (deletePost === true) {
            await deleteDoc(doc(cloudDb, 'posts', `${post}`));
            router.push(`/blog/all`);
            router.refresh();
          }
        } else {
          alert('작성자만 삭제 가능합니다.');
        }
      }}
    >
      삭제
    </button>
  );
}
