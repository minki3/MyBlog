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
import UpdateButton from '@/components/UpdateButton';
import DeleteButton from '@/components/DeleteButton';
import { dateFormat } from '@/utils/dateFormat';
import leftArrow from '@public/icon/leftArrow.png';
import rightArrow from '@public/icon/rightArrow.png';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  params: {
    post: string;
  };
  searchParams: {
    post: string;
    category: string;
  };
}
export default async function PostSlugPage({ params, searchParams }: Props) {
  console.log('1', searchParams);
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
  // console.log('1', data);
  const postResult = await getDocs(getPosts);
  let posts: any = [];
  postResult.forEach((doc) => {
    posts.push({ id: doc.id, data: doc.data() });
  });

  const currentPostIndex: number = posts.findIndex(
    (item: any) => item.id === params.post,
  );

  const currentPost = await posts.find((item: any) => item.id === params.post);
  console.log('1', currentPost.id);

  const date = dateFormat(data);
  if (currentPost === undefined) return <div>페이지를 찾을 수 없음</div>;
  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-between items-center border-black border-b-2 px-2 pb-2">
        <span className="font-bold">{currentPost.data.category}</span>
        <Link href={`/blog/${currentPost.data.category}`}>
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
        <span className="font-blod text-2xl">{currentPost.data.title}</span>
        <span>{date}</span>
      </div>
      <div className="flex justify-between mt-2 font-thin  px-2 ">
        <span>작성자 : {currentPost.data.auth}</span>
        <div className="gap-2 flex">
          <div>
            <UpdateButton uid={currentPost.data.uid} post={currentPost.id} />
          </div>
          <div>
            <DeleteButton uid={currentPost.data.uid} post={currentPost.id} />
          </div>
        </div>
      </div>
      <div className="prose" style={{ all: 'unset' }}>
        <div className="mt-4 pl-2 border-b-2 border-black">
          {parse(data.data.contents)}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        {currentPostIndex === 0 ? (
          <div></div>
        ) : (
          <Link href={`/blog/${posts[currentPostIndex - 1]?.id}`}>
            <div className="flex gap-2 border border-b-2 p-4">
              <Image src={leftArrow} alt="leftarrow" width={30} height={30} />
              <div className="flex flex-col">
                <span className="font-bold text-[12px]">
                  {posts[currentPostIndex - 1]?.data.category}
                </span>
                <span>{posts[currentPostIndex - 1]?.data.title}</span>
              </div>
            </div>
          </Link>
        )}
        {currentPostIndex === posts.length - 1 ? (
          <div></div>
        ) : (
          <Link href={`/blog/${posts[currentPostIndex + 1]?.id}`}>
            <div className="flex gap-2 border border-b-2 p-6">
              <div className="flex flex-col">
                <span className="font-bold text-[12px]">
                  {posts[currentPostIndex + 1]?.data.category}
                </span>
                <span>{posts[currentPostIndex + 1]?.data.title}</span>
              </div>
              <Image src={rightArrow} alt="rightarrow" width={30} height={30} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
