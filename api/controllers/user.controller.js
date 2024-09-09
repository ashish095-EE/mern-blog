import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';
export const test = (req,res) =>{
    res.json({message: 'API working'})
};

export const updateUser = async (req,res,next) =>{

    


     
    if(req.user.id!==req.params.userId){
        return next(errorHandler(401, 'You are not allowed to update the user '));


    }
    if(req.body.password){
        if(req.body.password.length<6){
            return next(errorHandler(400, 'Password must be at least 6 characters long'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password,10)
    }

    if(req.body.username ){
        if(req.body.username.length<7 || req.body.username.length>20){
            return next(errorHandler(400, 'Username must be between 7 and 20 characters long'));
        }
        if(req.body.username != req.body.username.toLowerCase()){
            return next(errorHandler(400, 'Username must be in lowercase'));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, 'Username can only contain alphanumeric characters'));
        };

    }

    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture,
                    
                    
                },
            },
            {new:true}
        
        );
        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest);
        
    } catch (error) {
        console.error(error);
        next(error);
        
    }
    


}

export const deleteUser = async (req, res,next) => {
    if(req.user.id!== req.params.userId){
        return next(errorHandler(401, 'You are not allowed to delete the user'));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({message: 'User deleted successfully'});
        
    } catch (error) {
        next(error);
    }
        
};
export const signout = async (req, res,next) => {
    
    try {
        res.clearCookie('access_token').status(200).json('user has been signed out');
        
        
    } catch (error) {
        next(error);
    }
        
};