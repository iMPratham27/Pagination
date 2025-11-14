import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api/posts"
})

export interface Post {
    post: String;
    _id?: String;
    createdAt?: string;
}

export const createPost = async (payload: { post: string }): Promise<Post> => {
  const { data } = await api.post("/", payload); 

  return data;
};

export const getPosts = async(page: number, limit:number =5) => {
    const {data} = await api.get("/",{
        params: {page,limit}
    })

    return data;
}
