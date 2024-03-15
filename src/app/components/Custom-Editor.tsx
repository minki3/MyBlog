import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { cloudDb } from '../../../firebase';
import { uploadPlugin } from '@/app/utils/UploaImage';
import { addDoc, collection } from 'firebase/firestore';

export const CATEGORY = [
  { category: '카테고리 선택', name: '' },
  { category: '개발', name: 'development' },
  { category: '취미', name: 'hobby' },
];

function CustomEditor() {
  const [headers, setHeaders] = useState({
    title: '',
    subTitle: '',
    category: '',
  });
  const [content, setContent] = useState<string>();

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setHeaders({ ...headers, [name]: value });
  };

  const handleCategory = (e: any) => {
    setHeaders({ ...headers, category: e });
  };

  const uploadHandler = () => {
    if (headers.category === '') return alert('카테고리를 선택해주세요.');
    addDoc(collection(cloudDb, `posts`), {
      title: headers.title,
      subTitle: headers.subTitle,
      contents: content,
      category: headers.category,
    })
      .then((res) => {
        console.log('성공');
      })
      .catch((e) => {
        console.log(e);
      });
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
      <select
        onChange={(e) => {
          handleCategory(e.target.value);
        }}
      >
        {CATEGORY.map(
          (item: { category: string; name: string }, idx: number) => {
            return (
              <option key={idx} value={item.name}>
                {item.category}
              </option>
            );
          },
        )}
      </select>
      <CKEditor
        editor={ClassicEditor}
        config={{
          extraPlugins: [uploadPlugin],
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo',
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
