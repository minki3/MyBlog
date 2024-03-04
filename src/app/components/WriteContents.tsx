"use client";
import React, { useState } from "react";
import { db } from "../../../firebase";
import { ref, set, getDatabase } from "firebase/database";

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

  const uploadHnadler = () => {
    const db = getDatabase();
    set(ref(db, `posts/${contents.title}`), {
      title: contents.title,
      subTitle: contents.subTitle,
      contents: contents.content,
      images: image,
    })
      .then((res) => console.log(res, "성공"))
      .catch((error) => console.log(error));
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
