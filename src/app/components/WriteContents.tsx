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
  const [headers, setHeaders] = useState({
    title: "",
    subTitle: "",
  });
  const [content, setContent] = useState<string>();

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setHeaders({ ...headers, [name]: value });
  };

  const handleCotent = (content: string) => {
    setContent(content);
  };

  console.log("2222", content);

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
      <input
        type="text"
        name="title"
        placeholder="제목"
        value={headers.title}
        onChange={handleInput}
      />
      <input
        type="text"
        name="subTitle"
        placeholder="부제목"
        value={headers.subTitle}
        onChange={handleInput}
      />
      {/* <textarea
        id="content"
        placeholder="내용"
        value={contents.content}
        onChange={handleInput}
      /> */}
      <Editor
        handleContent={handleCotent}
        content={content}
        setContent={setContent}
      />
      {/* <button onClick={uploadHnadler}>업로드</button> */}
    </div>
  );
}
