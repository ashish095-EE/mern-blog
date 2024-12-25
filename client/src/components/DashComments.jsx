import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import {Button, Modal, ModalBody, ModalHeader, Table}  from "flowbite-react";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck,FaTimes } from "react-icons/fa";

const DashComments = () => {

  const { currentUser } = useSelector((state)=>state.user);

  const [comments,setComments] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModels,setShowModels] = useState(false);
  const[commentIdToDelete,setCommentIdToDelete] = useState('');
  

  useEffect(() => {
    const fetchComments = async() =>{
      try {
        const res = await fetch(`/api/comment/getcomments`)
        const data= await res.json();
        

        if(res.ok){
          setComments(data.comments);
          if(data.comments.length<9){
            setShowMore(false);
          }
        }
        
      } catch (error) {
        console.log(error.message);
        
        
      }
    };
    if(currentUser.isAdmin){
      fetchComments();
    }

  }, [currentUser._id,currentUser.isAdmin])

  const handelShowMore = async() => {
    const startIndex = comments.length;

    try {
      const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`)
      const data= await res.json();
      
      if(res.ok){
        setComments((prev) => [...prev,...data.comments]);

        if(data.posts.length<9){
          setShowMore(false);
        }
      }
      
    } catch (error) {
      console.log(error.message);
      
    }

  }

  const deleteCommentOnClick  = async () => {
    setShowModels(false);
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(res.ok){
        setComments((prev) =>prev.filter((comment) => comment._id!==commentIdToDelete))
        setShowMore(false);
        setShowModels(false);
      }
      
    } catch (error) {
      console.log(error.message);
      
    }

  }
  return (
    <div className=" w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-200 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
    {currentUser.isAdmin && comments.length>0 ? (
      <>
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Comment Content</Table.HeadCell>
            <Table.HeadCell>Number Of Likes</Table.HeadCell>
            <Table.HeadCell>PostId</Table.HeadCell>
            <Table.HeadCell >User Id</Table.HeadCell>
            <Table.HeadCell>
              <span>Delete</span>
            </Table.HeadCell>
          </Table.Head>
          {comments.map((comment) => (
            // eslint-disable-next-line react/jsx-key
            <Table.Body className="divide-y" key={comment._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>

                <Table.Cell>
                  
                    <p>{comment.content}</p>
                  

                </Table.Cell>

                

                <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                <Table.Cell>{comment.postId}</Table.Cell>
                <Table.Cell>{comment.userId}</Table.Cell>
                

                <Table.Cell>
                  <button onClick={() =>{
              setShowModels(true);
              setCommentIdToDelete(comment._id)
            }} className="font-medium text-red-600 cursor-pointer hover:underline">Delete</button>
                </Table.Cell>
                
                
              </Table.Row>
            </Table.Body>
          ))}

        </Table>

        {showMore && (
          <button   onClick={handelShowMore}className="w-full text-teal-500 self-center text-sm py-7">
            Show More
          </button>
        )}
      
      </>
    ):(
      <h1>You got No Comments Yet</h1>
    )}

      <Modal show ={showModels}
        onClose={()=> setShowModels(false)}
        popup
        size='md'>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 mx-auto mb-5 text-gray-500' />
            <h3 className='font-semibold mb-5 text-lg m-4 text-gray-500 dark:text-gray-500'>Are You sure you want to Delete This Comment?</h3>
            <div className="flex justify-center gap-8">
              <Button color='failure' onClick={deleteCommentOnClick}>Yes,I am Sure</Button>
              <Button color='success' onClick={()=>setShowModels(false)}>No,Cancel</Button>
            </div>

          </div>
        </ModalBody>

      </Modal>
      
      
    </div>
  )
}

export default DashComments
