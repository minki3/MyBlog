import React from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { cloudDb, auth } from '../../../../firebase';
import parse from 'html-react-parser';

interface Props {
  params: {
    post: string;
  };
}
export default async function PostSlugPage({ params }: Props) {
  const q = query(collection(cloudDb, `posts/`));
  let data: any;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc.id === params.post)
      return (data = { name: doc.id, data: doc.data() });
  });

  if (data === undefined) return <div>페이지를 찾을 수 없음</div>;

  return (
    <div className="flex flex-col p-4">
      <span className="font-blod text-2xl pb-4 border-b-2 mb-8 pl-2 border-black">
        {data.data.title}
      </span>
      <div className="pl-2">
        <>{parse(data.data.contents)}</>
      </div>
    </div>
  );
}
