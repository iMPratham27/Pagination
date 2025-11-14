import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPosts } from "../apiHelper";
import {type Post} from "../apiHelper";

export const PostList = () => {

    const [page, setPage] = useState(1);
    const limit = 5;

    const { data, isFetching, isError } = useQuery({
        queryKey: ["posts", page],
        queryFn: () => getPosts(page, limit),
        staleTime: 1000*5,

    });

    if(isError) return <div>Failed to load posts.</div>

    // Mongoose returns an array of documents.
    const posts = data?.data ?? [];
    const meta = data?.meta;

    return (
        <div className="space-y-4">
            
            {isFetching && <p className="text-sm text-gray-400">Loading...</p>}

            {posts.length === 0 && <p className="text-gray-500">No posts yet!</p>}

            {posts.map((post: Post) => (
                <div key={post._id as string} className="p-3 border border-gray-300 rounded-lg bg-gray-50">
                    {post.post}
                </div>
            ))}

            {/* Pagination */}
            <div className="flex items-center justify-between pt-2">
                <button
                    onClick={() => setPage((p) => Math.max(1, p-1))}
                    disabled={page === 1}
                    className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 border cursor-pointer
                     border-gray-300 hover:bg-gray-300 disabled:opacity-40"
                >
                    Prev
                </button>

                <span className="text-gray-600 font-medium">
                    Page {page} / {meta?.totalPages}
                </span>

                <button
                    onClick={() => {
                        if(!meta?.totalPages) return;
                        setPage((p) => Math.min(meta?.totalPages, p+1))
                    }}
                    className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 border cursor-pointer
                     border-gray-300 hover:bg-gray-300 disabled:opacity-40"
                    disabled={page === meta?.totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}