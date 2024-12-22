import { Alert, Button, Modal, ModalBody, ModalHeader, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const CommentSection = ({ postId }) => {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const[showModal,setShowModal] = useState(false);
    const[commentToDelete, setCommentToDelete] = useState(null);

    

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }

        try {
            const res = await fetch(`/api/comment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id }),
            });

            const data = await res.json();

            if (res.ok) {
                setComment('');
                setCommentError(false);
                setComments([...comments, data]);
            }
        } catch (error) {
            console.log(error);
            setCommentError(true);
        }
    };

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`);

                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getComments();
    }, [postId]);

    const handelLikeComment = async (commentId) => {
        try {
            if(!currentUser){
                navigate('/signin');
                return;
            }
            const res= await fetch(`/api/comment/likeComment/${commentId}` , {
                method: 'PUT',
            });

            if(res.ok){
                const data = await res.json();
                setComments(comments.map((comment) => (comment._id === commentId? {...comment, likes: data.likes, numberOfLikes:data.likes.length} : comment)));
            }
            
        } catch (error) {
            console.log(error);
            
        }

    }

    const handelCommentEdit = async(comment,editedComment) => {
        setComments(
            comments.map((c)=>
            c._id === comment._id? {...c, content: editedComment} : c)
        )

    }

    const handelCommentDelete = async (commentId) => {
        setShowModal(false);
        try {
            if(!currentUser){
                navigate('/sigin');
                return;
            }
            const res  = await fetch(`/api/comment/deleteComment/${commentId}`, {
                method: 'DELETE'
            })

            if(res.ok){
                const data = await res.json();
                setComments(comments.filter((comment)=>comment._id!==commentId));
            }


            
        } catch (error) {
            console.log(error.message);
            
        }

    }

    return (
        <div className='w-full mx-auto p-3 max-w-2xl'>
            {currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm italic'>
                    <p>Signed in as:</p>
                    <img className='h-5 w-5 object-cover rounded' src={currentUser.profilePicture} alt="profilePic" />

                    <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
                        @{currentUser.username} :
                    </Link>
                </div>
            ) : (
                <div className='text-sm text-teal-500 my-5 flex gap-1'>
                    You must be logged in to comment
                    <Link to={'/signin'} className='text-teal-500 hover:underline hover:text-cyan-200'> Sign In</Link>
                </div>
            )}

            {currentUser && (
                <form onSubmit={handelSubmit} className='border border-teal-500 rounded-md p-3'>
                    <Textarea
                        placeholder='Add a Comment.... 🗣 ✏️'
                        rows='3'
                        maxLength='200'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className='flex justify-between items-center mt-5'>
                        <p>{200 - comment.length} words remaining</p>
                        <Button outline gradientDuoTone="purpleToBlue" type='submit'>
                            Add Comment
                        </Button>
                    </div>

                    {commentError && (
                        <Alert color="failure">{commentError}</Alert>
                    )}
                </form>
            )}

            {comments.length === 0 ? (
                <p className='text-sm my-5'>No Comments Yet!</p>
            ) : (
                <>
                    <div className='text-sm my-5 flex items-center gap-1'>
                        <p className='text-sm font-semibold'>Comments</p>
                        <div className="border border-l-gray-400 py-1 px-1 rounded-sm">
                            <p>{comments.length}</p>
                        </div>
                        {/* Map over comments to display them */}
                    </div>
                    {comments.map(comment => (
                        <Comment key={comment._id} comment = {comment} onLike = {handelLikeComment} onEdit = {handelCommentEdit} onDelete={(commentId) => {
                            setShowModal(true);
                            setCommentToDelete(commentId);
                            
                        }}/>
                    )
    
                    )}
                    <Modal show ={showModal}
                            onClose={()=> setShowModal(false)}
                            popup
                            size='md'>
                            <ModalHeader />
                            <ModalBody>
                              <div className="text-center">
                                <HiOutlineExclamationCircle className='h-14 w-14 mx-auto mb-5 text-gray-500' />
                                <h3 className='font-semibold mb-5 text-lg m-4 text-gray-500 dark:text-gray-500'>Are You sure you want to Delete This Comment?</h3>
                                <div className="flex justify-center gap-8">
                                  <Button color='failure' onClick={()=>handelCommentDelete(commentToDelete)}>Yes,I am Sure</Button>
                                  <Button color='success' onClick={()=>setShowModal(false)}>No,Cancel</Button>
                                </div>
                    
                              </div>
                            </ModalBody>
                    
                          </Modal>
                </>
            )}
        </div>
    );
};

export default CommentSection;
