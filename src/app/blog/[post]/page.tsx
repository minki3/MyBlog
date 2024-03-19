import React from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { cloudDb, auth } from '../../../../firebase';
import parse from 'html-react-parser';
import UpdateButton from '@/app/components/UpdateButton';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    post: string;
  };
}
export default async function PostSlugPage({ params }: Props) {
  const q = doc(cloudDb, `posts/`, `${params.post}`);
  let data: any;
  const query = await getDoc(q);
  if (query.exists()) {
    data = { name: query.id, data: query.data() };
  }
  // query.forEach((doc) => {
  //   if (querySnapshot) return (data = { name: doc.id, data: doc.data() });
  // });

  if (data === undefined) return <div>페이지를 찾을 수 없음</div>;

  return (
    <div className="flex flex-col p-4">
      <UpdateButton uid={data.data.uid} post={data.name} />
      <span className="font-blod text-2xl pb-4 border-b-2 mb-8 pl-2 border-black">
        {data.data.title}
      </span>
      <div className="pl-2">
        <>{parse(data.data.contents)}</>
      </div>
    </div>
  );
}
