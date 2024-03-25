import React from 'react';
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';
import { cloudDb } from '../../../../firebase';
import parse from 'html-react-parser';
import UpdateButton from '@/app/components/UpdateButton';
import DeleteButton from '@/app/components/DeleteButton';
import { dateFormat } from '@/app/utils/dateFormat';

interface Props {
  params: {
    post: string;
  };
}
export default async function PostSlugPage({ params }: Props) {
  const q = doc(cloudDb, `posts`, `${params.post}`);
  let data: any;
  const result = await getDoc(q);
  if (result.exists()) {
    data = { name: result.id, data: result.data() };
  }

  const getPosts = query(
    collection(cloudDb, 'posts'),
    where('category', '==', data.data.category),
  );

  // const postResult = await getDocs(getPosts);
  // postResult.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, ' => ', doc.data());
  // });

  const date = dateFormat(data);
  if (data === undefined) return <div>페이지를 찾을 수 없음</div>;
  return (
    <div className="flex flex-col p-4">
      <div className="border-black border-b-2 pl-2 pb-2">
        <span className="font-bold">{data.data.category}</span>
      </div>
      <div className=" py-4 border-b-2  px-2 border-black flex items-center justify-between">
        <span className="font-blod text-2xl">{data.data.title}</span>
        <span>{date}</span>
      </div>
      <div className="flex justify-between mt-2 font-thin  px-2 ">
        <span>작성자 : {data.data.auth}</span>
        <div className="gap-2 flex">
          <div>
            <UpdateButton uid={data.data.uid} post={data.name} />
          </div>
          <div>
            <DeleteButton uid={data.data.uid} post={data.name} />
          </div>
        </div>
      </div>
      <div className="prose" style={{ all: 'unset' }}>
        <div className="mt-4 pl-2 border-b-2 border-black">
          {parse(data.data.contents)}
        </div>
      </div>
    </div>
  );
}
