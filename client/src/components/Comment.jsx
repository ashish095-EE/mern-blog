import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import   {Button, Textarea} from "flowbite-react"
export default function Comment({ comment,onLike,onEdit }) {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing]=  useState(false);
    const[editedContent,setEditedContent] = useState(comment.content);
    
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();

                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [comment]);

    const handelEdit = async () =>{
        setIsEditing(true);
        setEditedContent(comment.content)

    }

    const handelSave = async ()=>{
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: editedContent
                }),
            });
            const data = await res.json();

            if(res.ok){
                setIsEditing(false);
                // comment.content = editedContent;
                onEdit(comment,editedContent);
            }
            
        } catch (error) {
            console.log(error.message);
            
        }
    }

    return <div className="flex mb-1 border-b dark:border-x-gray-200">
        <div className="flex-shrink-0 mr-2">
            <img className="w-10 h-10 rounded-full bg-gray-200" src={user.profilePicture} alt={user.username} />
        </div>

        <div className="flex-1">
            <div className="flex items-center mb-1">
                <span className="font-bold mr-1 text-xs truncate">{user ? `@${user.username}` : `anonymous user` }</span>

                <span className="text-gray-500 text-xs">{moment(comment.createdAt).fromNow()}</span>
            </div>

            {isEditing ? (

                <>

                <Textarea className="mb-2 border-gray-400 p-2 w-full" value={editedContent} onChange={(e)=> setEditedContent(e.target.value)} />
                    <div className="flex gap-2 justify-end text-xs mb-2">
                        <Button type="button" size="sm" gradientDuoTone='purpleToBlue' onClick={handelSave}>
                            Save

                        </Button>
                        <Button type="button" size="sm" outline gradientDuoTone='purpleToBlue'
                        onClick={() => setIsEditing(false)} >
                            Cancel

                        </Button>
                    </div>
                </>
                
                
            ) : (
                <>
                     <p className="text-gray-500 mb-2 pb-2">{comment.content}</p>
            <div className="flex gap-2 my-2 items-center">
                <button type = "button" onClick={()=>onLike(comment._id)} className={`text-gray-400 hover:text-blue-700 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'  }`}> <FaThumbsUp /></button>
                <span className="text-gray-500 text-xs ml-2 font-semibold">{comment.likes.length>0 && comment.numberOfLikes+" " + (comment.numberOfLikes===1 ? "Like" : "Likes")}</span>

                {
                    currentUser && (currentUser.isAdmin || comment.userId===currentUser._id) && (
                        <button onClick={handelEdit} type="button" className="text-xs ml-2 font-semibold text-gray-400 hover:text-blue-500 ">
                            Edit
                        </button>
                    )
                }
                 
            </div>
                
                </>

            )}

           

        </div>
        
    </div>;
}

Comment.propTypes = {
    comment: PropTypes.shape({
        userId: PropTypes.string.isRequired,
    }).isRequired,
};
