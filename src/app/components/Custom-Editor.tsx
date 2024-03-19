import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { cloudDb } from '../../../firebase';
import { uploadPlugin } from '@/app/utils/UploaImage';
import {
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { auth } from '../../../firebase';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export const CATEGORY = [
  { category: '카테고리 선택', name: '' },
  { category: '개발', name: 'development' },
  { category: '취미', name: 'hobby' },
];

function CustomEditor() {
  const params = useSearchParams();

  const post = params.get('post');

  const [userInformation, setUserInformation] = useState<any>();
  const [headers, setHeaders] = useState({
    title: '',
    subTitle: '',
    category: '',
  });
  const [content, setContent] = useState<string>();
  const router = useRouter();

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setHeaders({ ...headers, [name]: value });
  };

  const handleCategory = (e: any) => {
    setHeaders({ ...headers, category: e });
  };

  const uploadHandler = async () => {
    if (headers.category === '') return alert('카테고리를 선택해주세요.');

    if (post) {
      const updatePost = doc(cloudDb, 'posts', `${post}`);
      await updateDoc(updatePost, {
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
    } else {
      addDoc(collection(cloudDb, `posts`), {
        title: headers.title,
        subTitle: headers.subTitle,
        contents: content,
        category: headers.category,
        auth: userInformation.displayName,
        uid: userInformation.uid,
        timestamp: serverTimestamp(),
      })
        .then((res) => {
          console.log('성공');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserInformation(user);
      } else {
        alert('로그인 후 이용');
        router.push('/');
      }
    });
  }, []);

  //문서 수정 코드
  useEffect(() => {
    const getData = async () => {
      const q = doc(cloudDb, 'posts/', `${post}`);
      const query = await getDoc(q);
      console.log(post);
      console.log(query.id);
      if (query.exists()) {
        console.log('Document data:', query.data());
        console.log(query.id);
        setHeaders({
          title: query.data().title,
          subTitle: query.data().subTitle,
          category: query.data().category,
        });
        setContent(query.data().contents);
      } else {
        if (post !== null) router.push('/');
      }
    };
    getData();
  }, [post]);

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
        value={headers.category}
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
