import Post from "../models/post.model.js";
export const create = async(req, res, next) => {
    console.log(req.user);

    if(!req.user.isAdmin){   //req from the user using req.user not req.body 
        return next(403,"You are not a Admin");

    }
    if(!req.body.title||!req.body.content){
        return next(400,"Title and content are required");
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');

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