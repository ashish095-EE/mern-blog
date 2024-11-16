
import { Alert, Button, Textarea } from 'flowbite-react';
import { useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';


const CommentSection = ({postId}) => {
    const {currentUser} = useSelector((state) => state.user);

    const [comment,setComment] = useState('');
    const[commentError, setCommentError] = useState(null);

    const handelSubmit = async (e) => {
        e.preventDefault(); 
        if(comment.length > 200){
            return;
        }

        try {
            const res = await fetch(`/api/comment/create`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({content:comment, postId, userId:currentUser._id}),
                    
            });
    
            const data  = await res.json();
    
            if(res.ok){
                    setComment('');
                    setCommentError(false);
            }
    
            
        } catch (error) {
            console.log(error);
            setCommentError(true);
            
        }

        
            
        

        
    }
  return (
    <div className='w-full mx-auto p-3 mx-w-2xl '>
        {
            currentUser ?
            (
                <div className=' flex items-center gap-1 my-5 text-gray-500 text-sm italic'>
                <p>Signed in as:</p>
                <img className='h-5 w-5 object-cover rounded' src={currentUser.profilePicture} alt="profilePic" />

                <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
                    @{currentUser.username} :
                
                
                </Link>
            </div>
            ):(
                <div className='text-sm text-teal-500 my-5 flex gap-1'>
                    You must be logged in to comment 

                    <Link to={'/signin'} className='text-teal-500 hover:underline hover:text-cyan-200'> Sign In</Link>
                </div>

            )
        }

        {currentUser && (
            <form onSubmit={handelSubmit} className='border border-teal-500 rounded-md p-3'>
                <Textarea
                placeholder='Got something in your mind? Comment 🗣 ✏️'
                rows='3'
                maxLength='200'
                onChange={(e) => setComment(e.target.value)}
                vlaue={comment}
                
                />
                <div className='flex justify-between items-center mt-5'>
                    <p className=''>{200- comment.length} words remaining</p>
                    <Button outline gradientDuoTone="purpleToBlue"
                    type='submit'>
                        submit
                    </Button>
                </div>

                {commentError && (
                    <Alert color="failure">{commentError
                    }</Alert>
                )}
            </form>
        )}
       
        
      
    </div>
  )
}

export default CommentSection
