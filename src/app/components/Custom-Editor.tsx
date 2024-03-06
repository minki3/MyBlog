import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { db } from "../../../firebase";
import { CustomUploadAdapter } from "@/app/utils/UploaImage";
import { ref, set } from "firebase/database";

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "imageUpload",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
  ],
};

function CustomEditor() {
  const [headers, setHeaders] = useState({
    title: "",
    subTitle: "",
  });
  const [content, setContent] = useState<string>();

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setHeaders({ ...headers, [name]: value });
  };

  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return new CustomUploadAdapter(loader);
    };
  }

  const uploadHandler = () => {
    set(ref(db, `posts/${headers.title}`), {
      title: headers.title,
      subTitle: headers.subTitle,
      contents: content,
    })
      .then((res) => console.log("성공"))
      .catch((e) => console.log(e));
  };

  return (
    <>
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
      <CKEditor
        editor={ClassicEditor}
        config={{
          extraPlugins: [uploadPlugin],
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "outdent",
            "indent",
            "|",
            "imageUpload",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "undo",
            "redo",
          ],
        }}
        data={content}
        onChange={(_, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />
      <button onClick={uploadHandler}>업로드</button>
    </>
  );
}

export default CustomEditor;
