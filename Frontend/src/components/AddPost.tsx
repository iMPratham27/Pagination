import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPost } from "../apiHelper";

export const AddPost = () => {

    const [text, setText] = useState("");
    const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["posts"]})
        setText("");
    }
  });
 
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const trimmed = text.trim();
        if(!trimmed) return;
        
        mutation.mutate({post: trimmed});
    }

    return (
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <input 
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className=" flex-1 border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-gray-300 "
                placeholder="Add new post!"
                
            />
            <button
                className=" px-4 py-2 rounded-lg bg-gray-700 text-white cursor-pointer
                    hover:bg-gray-700 disabled:opacity-50"
                disabled={mutation.isPending}
            >
                {mutation.isPending ? "Adding.." : "Add"}
            </button>
        </form>
    );
}