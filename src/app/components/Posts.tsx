"use client";
import { db } from "../../../firebase";
import { ref, onValue } from "firebase/database";
import React, { useEffect, useState } from "react";

export default function Posts() {
  const [test, setTest] = useState();

  useEffect(() => {
    const starCountRef = ref(db, "posts/ck test");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setTest(data);
    });
  }, []);

  return <div></div>;
}
