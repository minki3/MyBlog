import React from 'react';
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  orderBy,
} from 'firebase/firestore';
import { cloudDb } from '../../../../firebase';
import parse from 'html-react-parser';
import UpdateButton from '@/app/components/UpdateButton';
import DeleteButton from '@/app/components/DeleteButton';
import { dateFormat } from '@/app/utils/dateFormat';
import leftArrow from '@public/icon/leftArrow.png';
import rightArrow from '@public/icon/rightArrow.png';
import Link from 'next/link';
import Image from 'next/image';

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
    orderBy('timestamp', 'desc'),
  );

  const postResult = await getDocs(getPosts);
  let posts: any = [];
  postResult.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    posts.push({ id: doc.id, data: doc.data() });
  });

  console.log(posts);

  const currentPost: number = posts.findIndex(
    (item: any) => item.id === params.post,
  );

  const date = dateFormat(data);
  if (data === undefined) return <div>페이지를 찾을 수 없음</div>;
  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-between items-center border-black border-b-2 px-2 pb-2">
        <span className="font-bold">{data.data.category}</span>
        <Link href={`/blog/${data.data.category}`}>
          <Image
            src={leftArrow}
            alt="arrow"
            width={20}
            height={20}
            className=" hover:cursor-pointer"
          />
        </Link>
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
      <div className="flex justify-between mt-4">
        {currentPost === 0 ? (
          <div></div>
        ) : (
          <Link href={`/blog/${posts[currentPost - 1]?.id}`}>
            <div className="flex gap-2 border border-b-2 p-4">
              <Image src={leftArrow} alt="leftarrow" width={30} height={30} />
              <div className="flex flex-col">
                <span className="font-bold text-[12px]">
                  {posts[currentPost - 1]?.data.category}
                </span>
                <span>{posts[currentPost - 1]?.data.title}</span>
              </div>
            </div>
          </Link>
        )}
        {currentPost === posts.length - 1 ? (
          <div></div>
        ) : (
          <Link href={`/blog/${posts[currentPost + 1]?.id}`}>
            <div className="flex gap-2 border border-b-2 p-6">
              <div className="flex flex-col">
                <span className="font-bold text-[12px]">
                  {posts[currentPost + 1]?.data.category}
                </span>
                <span>{posts[currentPost + 1]?.data.title}</span>
              </div>
              <Image src={rightArrow} alt="rightarrow" width={30} height={30} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
