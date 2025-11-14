import { AddPost } from "./AddPost";
import { PostList } from "./PostList";

export const Home = () => {
  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100 py-10">
      <div className="w-full max-w-xl flex flex-col gap-6 bg-white p-6 rounded-xl shadow-sm ">
        <AddPost />
        <PostList />
      </div>
    </div>
  );
};
