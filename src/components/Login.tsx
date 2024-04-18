'use client';
import React, { useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  browserSessionPersistence,
  setPersistence,
} from 'firebase/auth';

import { auth } from '../../firebase';
import { CreateAuthContext } from '@/context/AuthContext';

interface Props {
  userInformation: any;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ userInformation, setModalOpen }: Props) {
  // const { userInformation } = useContext(CreateAuthContext);

  const [information, setInformation] = useState({
    email: '',
    password: '',
  });

  const handleInformation = (e: any) => {
    const { name, value } = e.target;
    setInformation({ ...information, [name]: value });
  };

  const login = () => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(
          auth,
          information.email,
          information.password,
        );
      })
      .then(() => {
        setModalOpen(false);
        setInformation({ email: '', password: '' });
      })
      .catch((err) => {
        console.log(err);
        alert('아이디와 비밀번호를 확인해주세요.');
      });
  };

  // const logout = () => {
  //   signOut(auth)
  //     .then((result) => {
  //       console.log('로그아웃', result);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  return (
    <div className="flex flex-col gap-2">
      {!userInformation && (
        <>
          <input
            className="border p-2"
            type="email"
            name="email"
            value={information.email}
            placeholder="이메일을 입력해주세요."
            onChange={handleInformation}
          />
          <input
            className="border p-2"
            type="password"
            name="password"
            value={information.password}
            placeholder="비밀번호를 입력해주세요."
            onChange={handleInformation}
          />
          <button className="border border-black" type="button" onClick={login}>
            로그인
          </button>
        </>
      )}
      {/* {userInformation && (
        <div className="flex gap-2">
          {auth.currentUser?.displayName}
          <span onClick={logout}>로그아웃</span>
        </div>
      )} */}
    </div>
  );
}
