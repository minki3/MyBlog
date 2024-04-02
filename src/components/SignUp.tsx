'use client';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, app } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { cloudDb } from '../../firebase';

const Login = () => {
  const [information, setInformation] = useState({
    email: '',
    password: '',
    nickname: '',
  });

  const singUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        information.email,
        information.password,
      );

      await updateProfile(result.user, { displayName: information.nickname });

      setDoc(doc(cloudDb, 'users', `${result.user.uid}`), {
        email: result.user.email,
        displayName: result.user.displayName,
        uid: result.user.uid,
      });

      console.log('db 저장 성공');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  const handleInformation = (e: any) => {
    const { name, value } = e.target;
    setInformation({ ...information, [name]: value });
  };

  return (
    <section>
      <input
        className="border"
        type="email"
        name="email"
        placeholder="이메일을 입력해주세요."
        onChange={handleInformation}
      />
      <input
        className="border"
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        onChange={handleInformation}
      />
      <input
        className="border"
        type="text"
        name="nickname"
        placeholder="닉네임을 입력해주세요."
        onChange={handleInformation}
      />
      <button className="border" type="button" onClick={singUp}>
        signUp
      </button>
    </section>
  );
};

export default Login;
