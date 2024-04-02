'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { CreateAuthContext } from '@/context/AuthContext';

export default function WriteButton() {
  const router = useRouter();

  const { userInformation } = useContext(CreateAuthContext);

  return (
    <button
      className=" font-bold border text-xl p-2"
      onClick={() => {
        if (userInformation) {
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
