import { Request, Response } from "express";
import { postModel } from "../models/postModel";

export const createPost = async(req: Request, res: Response) => {
    try{
        const { post } = req.body;
        if(!post){
            return res.status(400).json({
                message: "Post cannot be empty."
            });
        }

        const newPost = await postModel.create({ post: post.trim() })
        /* 
            create({ feild name in Db: value from request(i.e. user input) })
        */

        return res.status(201).json({
            success: true,
            message: "Created new Post!!",
            data: newPost
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to create a new post."
        })
    }
}

export const getPosts = async(req: Request, res: Response) => {
    try{
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        /* 
            parseInt(req.query.page as string) || 1
            - convert the page to number
            - if there is no page -> default page to 1

            Math.max(1, ...) - makes sure page is never less than 1
        */

        const limit = Math.max(1, Math.min(20, parseInt(req.query.limit as string) || 5));
        /* 
            parseInt(req.query.limit as string) || 5 - if there is not limit -> default limit to 5
            Math.min(20, ..) - cap the limit to 20 if the limit is greater than 20
            Math.max(1, ..) - makes sure limit is at least 1
        */
        
        const skip = (page-1)*limit;

        const [posts, total] = await Promise.all([
            postModel.find().sort({createdAt: -1})
                            .skip(skip)
                            .limit(limit)
                            .lean(), // return plain JS objects (faster) instead of full Mongoose documents

            postModel.countDocuments(),
        ]);

        const totalPages = Math.ceil(total/limit);

        return res.status(200).json({
            success: true,
            data: posts,
            meta: {
                total,
                page,
                limit,
                totalPages
            }
        });

    }catch(err){
        return res.status(500).json({
            sucess: false,
            message: "Failed to fetch posts."
        });
    }
}
