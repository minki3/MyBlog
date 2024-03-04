"use client";
import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../../firebase";

export default function Login() {
  const [information, setInformation] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);

  const handleInformation = (e: any) => {
    const { name, value } = e.target;
    setInformation({ ...information, [name]: value });
  };

  const login = () => {
    signInWithEmailAndPassword(auth, information.email, information.password)
      .then((result) => {
        console.log(result, " login!!!!");
        setInformation({ email: "", password: "" });
      })
      .catch((err) => {
        console.log(err);
        alert("아이디와 비밀번호를 확인해주세요.");
      });
  };

  const logout = () => {
    signOut(auth).then((result) => {
      console.log("로그아웃", result);
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setIsLogin(true);
      else setIsLogin(false);
    });
  }, []);

  return (
    <div>
      {!isLogin && (
        <>
          <input
            className="border"
            type="email"
            name="email"
            value={information.email}
            placeholder="이메일을 입력해주세요."
            onChange={handleInformation}
          />
          <input
            className="border"
            type="password"
            name="password"
            value={information.password}
            placeholder="비밀번호를 입력해주세요."
            onChange={handleInformation}
          />
          <button className="border" type="button" onClick={login}>
            로그인
          </button>
        </>
      )}
      {isLogin && (
        <div>
          {auth.currentUser && auth.currentUser.displayName}
          <span onClick={logout}>로그아웃</span>
        </div>
      )}
    </div>
  );
}
