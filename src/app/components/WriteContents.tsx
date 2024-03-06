"use client";
import React, { useState } from "react";
import { storage, db } from "../../../firebase";
import { ref, set, getDatabase } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import CustomEditor from "@/app/components/Custom-Editor";
import dynamic from "next/dynamic";

export default function WriteContents() {
  const Editor = dynamic(() => import("@/app/components/Custom-Editor"), {
    ssr: false,
  });
  // const uploadHnadler = async () => {
  //   // 스토리지 접근
  //   const imageStorageRef = storageRef(storage, `images/${contents.title}`);
  //   // 스토리지에 파일 업로드
  //   await uploadBytes(
  //     imageStorageRef,
  //     image?.map((item: any, idx: number) => {
  //       return item[0][idx];
  //     })
  //   ).then(() => console.log("파일 업로드 성공"));

  //   await getDownloadURL(storageRef(storage, `images/${contents.title}`)).then(
  //     (result) => {
  //       set(ref(db, `posts/${contents.title}`), {
  //         title: contents.title,
  //         subTitle: contents.subTitle,
  //         contents: contents.content,
  //         images: result,
  //       })
  //         .then((res) => console.log("성공"))
  //         .catch((e) => console.log(e));
  //     }
  //   );
  // };
  return (
    <div>
      <Editor />
    </div>
  );
}
