import Login from "@/app/components/Login";
import Posts from "@/app/components/Posts";
import SignUp from "@/app/components/SignUp";
import WriteContents from "@/app/components/WriteContents";

export default function Home() {
  return (
    <main className="">
      {/* <SignUp /> */}
      <Login />
      <WriteContents />
      <Posts />
    </main>
  );
}
