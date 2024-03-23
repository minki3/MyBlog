import React, { useState, useEffect, useContext } from 'react';
import { CreateAuthContext } from '@/app/context/AuthContext';
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
  const { userInformation } = useContext(CreateAuthContext);

  const post = params.get('post');

  const [headers, setHeaders] = useState({
    title: '',
    category: '',
  });
  const [content, setContent] = useState<string>();
  const router = useRouter();
  console.log(content);
  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setHeaders({ ...headers, [name]: value });
  };

  const handleCategory = (e: any) => {
    setHeaders({ ...headers, category: e });
  };

  const uploadHandler = async () => {
    if (headers.category === '') return alert('카테고리를 선택해주세요.');
    if (headers.title === '') return alert('제목을 입력 해주세요.');

    if (post) {
      const updatePost = doc(cloudDb, 'posts', `${post}`);
      await updateDoc(updatePost, {
        title: headers.title,
        contents: content,
        category: headers.category,
      })
        .then((res) => {
          console.log('성공');
          router.push(`/blog/${post}`);
          router.refresh();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      addDoc(collection(cloudDb, `posts`), {
        title: headers.title,
        contents: content,
        category: headers.category,
        auth: userInformation.displayName,
        uid: userInformation.uid,
        timestamp: serverTimestamp(),
      })
        .then((res) => {
          router.push(`/blog/all`);
          router.refresh();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  //문서 수정 코드
  useEffect(() => {
    const getData = async () => {
      const q = doc(cloudDb, 'posts/', `${post}`);
      const query = await getDoc(q);
      if (query.exists()) {
        setHeaders({
          title: query.data().title,
          category: query.data().category,
        });
        setContent(query.data().contents);
      } else {
        if (post !== null) {
          alert('글이 존재하지 않습니다.');
          router.push('/');
        }
      }
    };
    getData();
  }, [post]);

  if (userInformation === null) {
    alert('로그인 후 이용');
    router.push('/');
  }

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <select
          value={headers.category}
          className=" border border-gray-400 rounded-lg p-2 mr-4"
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
        <input
          type="text"
          name="title"
          placeholder="제목"
          className="w-[70%] border border-gray-400 rounded-lg p-2"
          value={headers.title}
          onChange={handleInput}
        />
      </div>

      <CKEditor
        editor={ClassicEditor}
        // className="h-[500px]"
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
      <div className="flex justify-center gap-4">
        <button
          className="border p-2 mt-4 rounded-lg"
          onClick={() => {
            router.push('/blog/all');
          }}
        >
          취소
        </button>
        <button onClick={uploadHandler} className="border p-2 mt-4 rounded-lg">
          업로드
        </button>
      </div>
    </div>
  );
}

export default CustomEditor;
