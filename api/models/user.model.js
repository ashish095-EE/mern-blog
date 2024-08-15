import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {              //models are set of rules and regualtion to be followed by the user.
        type:String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
    }, {timestamp:true}                                 //user time pf creation and other user information
);

const User = mongoose.model('User', userSchema);

export default User;
