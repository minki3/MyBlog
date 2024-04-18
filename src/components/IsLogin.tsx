'use client';
import React from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface Props {
  userInformation: any;
}
export default function IsLogin({ userInformation }: Props) {
  const router = useRouter();
  const logout = () => {
    signOut(auth)
      .then(() => {
        window.location.reload();
        console.log('로그아웃');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {userInformation && (
        <div className="flex gap-2">
          {auth.currentUser?.displayName}
          <span
            className=" hover:cursor-pointer"
            onClick={() => {
              logout();
            }}
          >
            로그아웃
          </span>
        </div>
      )}
    </div>
  );
}
