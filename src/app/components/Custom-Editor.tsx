"use client";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage, db } from "../../../firebase";

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
interface Props {
  handleContent: (content: string) => void;
  content?: string;
  setContent: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function CustomEditor({ handleContent, content, setContent }: Props) {
  class CustomUploadAdapter {
    loader: any;
    constructor(loader: any) {
      this.loader = loader;
    }

    upload() {
      return new Promise((resolve, reject) => {
        this.loader.file.then(async (file: any) => {
          const imageStorageRef = storageRef(
            storage,
            `images/posts/${file.name}`
          );
          await uploadBytes(imageStorageRef, file)
            .then(() => {
              console.log("Upload successful");
              getDownloadURL(imageStorageRef)
                .then((url) => console.log(url))
                .then((url) => resolve({ default: url }))
                .catch((error) => reject(error));
            })
            .catch((error) => {
              reject(error);
            });
        });
      });
    }
  }
  // function uploadAdapter(loader: any) {
  //   return new Promise((resolve, reject) => {
  //     loader.file.then(async (file: any) => {
  //       const imageStorageRef = storageRef(storage, `images/test/${file.name}`);
  //       await uploadBytes(imageStorageRef, file)
  //         .then(() => {
  //           console.log("Upload successful");
  //           getDownloadURL(imageStorageRef)
  //             .then((url) => console.log(url))
  //             .then((url) => resolve({ default: url }))
  //             .catch((error) => reject(error));
  //         })
  //         .catch((error) => {
  //           reject(error);
  //         });
  //     });
  //   });
  // }

  // function uploadPlugin(editor: any) {
  //   editor.plugins.get("FileRepository").createUploadAdapter = (
  //     loader: any
  //   ) => {
  //     return uploadAdapter(loader);
  //   };
  // }
  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return new CustomUploadAdapter(loader);
    };
  }
  return (
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
      onChange={(event, editor) => {
        console.log(editor);
        // const data = editor.getData();
        // setContent(editor.getData());
        // handleContent(data);
        // console.log({ event, editor, data });
      }}
    />
  );
}

export default CustomEditor;
