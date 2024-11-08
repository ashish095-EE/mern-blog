import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";
export const create = async(req, res, next) => {
    console.log(req.user);

    if(!req.user.isAdmin){   //req from the user using req.user not req.body 
        return next(403,"You are not a Admin");

    }
    if(!req.body.title||!req.body.content){
        return next(400,"Title and content are required");
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');
    console.log(req.body);

    const newPost = new Post({
        ...req.body,
        
        slug,
        userId: req.user.id,
    });

    try {
        const savesPost = await newPost.save();
        res.status(201).json(savesPost);

        
    } catch (error) {
        console.error(error);
        next(error);
        
    }
};

export const getposts = async(req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex)||0;//from what number to start fetching
        const limit = parseInt(req.query.limit)||9; //only 9 posts shows in the dashboard
        const sortDirection = req.query.order ==='asc' ? 1:-1;

        const posts = await Post.find({
            ...(req.query.userId && {userId:req.query.userId}),
            ...(req.query.category && {category:req.query.category}),
            ...(req.query.slug && {slug:req.query.slug}),
            ...(req.query.postId && {_id:req.query.postId}),
            ...(req.query.searchTerm && {
                $or:[
                    {title:{$regex:req.query.searchTerm, $options:'i'}},
                    {content:{$regex:req.query.searchTerm, $options:'i'}},
                ],
            }),
        }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit);

        //getting total number of posts

        const totalPosts = await Post.countDocuments();

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate(),
            
        );

        const lastMonthPosts =await Post.countDocuments({
            createdAt:{$gte:oneMonthAgo}
            
        });
        res.status(200).json({posts, totalPosts, lastMonthPosts});

        
    } catch (error) {
        
        next(error);
        
    }
}

export const deletepost = async (req, res,next) =>{
    if(!req.user.isAdmin || req.user.id!==req.params.userId){
        return next(errorHandler(403,"You are not an Admin"));

    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json({message: 'Post deleted successfully'});
        
    } catch (error) {
        next(error);
    }

}

export const updatepost = async (req, res, next) => {
    if(!req.user.isAdmin || req.user.id!==req.params.userId){
        return next(errorHandler(403,"You are not an Admin"));
    }
    try {
        const updatePost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set: {
                    title:req.body.title,
                    content:req.body.content,
                    category:req.body.category,
                    image:req.body.image,
                }

            }, {new:true}
        )
        res.status(200).json(updatePost);
        
    } catch (error) {
        next(error)
        
    }
}