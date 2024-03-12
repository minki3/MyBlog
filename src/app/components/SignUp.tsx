'use client';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, app } from '../../../firebase';

const Login = () => {
  const [information, setInformation] = useState({
    email: '',
    password: '',
    nickname: '',
  });
  console.log(app);

  const singUp = () => {
    createUserWithEmailAndPassword(
      auth,
      information.email,
      information.password,
    )
      .then((result) => {
        updateProfile(result.user, { displayName: information.nickname });
        console.log(result, 'Sign Up!!!');
      })
      .catch((err) => {
        console.log(err);
      });
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
