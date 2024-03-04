"use client";
import React, { useState } from "react";
import { storage, db } from "../../../firebase";
import { ref, set, getDatabase } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default function WriteContents() {
  const [contents, setContents] = useState({
    title: "",
    subTitle: "",
    content: "",
  });
  const [image, setImage] = useState<any>([]);

  const handleInput = (e: any) => {
    const { id, value } = e.target;
    setContents({ ...contents, [id]: value });
  };

  const handleImage = (e: any) => {
    let files: any = [];
    const selectedFiles = e.target.files;

    for (let i = 0; i < selectedFiles.length; i++) {
      files.push(selectedFiles[i]);
    }
    setImage([...image, files]);
  };

  console.log(image);

  const uploadHnadler = async () => {
    // 스토리지 접근
    const imageStorageRef = storageRef(storage, `images/${contents.title}`);
    // 스토리지에 파일 업로드
    await uploadBytes(imageStorageRef, image[0][0]).then(() =>
      console.log("파일 업로드 성공")
    );

    await getDownloadURL(storageRef(storage, `images/${contents.title}`)).then(
      (result) => {
        set(ref(db, `posts/${contents.title}`), {
          title: contents.title,
          subTitle: contents.subTitle,
          contents: contents.content,
          images: result,
        })
          .then((res) => console.log("성공"))
          .catch((e) => console.log(e));
      }
    );
  };
  return (
    <div>
      <input
        type="text"
        id="title"
        placeholder="제목"
        value={contents.title}
        onChange={handleInput}
      />
      <input
        type="text"
        id="subTitle"
        placeholder="부제목"
        value={contents.subTitle}
        onChange={handleInput}
      />
      <textarea
        id="content"
        placeholder="내용"
        value={contents.content}
        onChange={handleInput}
      />
      <input type="file" onChange={handleImage} />
      <button onClick={uploadHnadler}>업로드</button>
    </div>
  );
}
