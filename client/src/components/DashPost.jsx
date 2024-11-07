import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import {Button, Modal, ModalBody, ModalHeader, Table}  from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashPost = () => {

  const { currentUser } = useSelector((state)=>state.user);

  const [userPosts,setUserPosts] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModels,setShowModels] = useState(false);
  const[postIdToDelete,setPostIdToDelete] = useState('');
  

  useEffect(() => {
    const fetchPosts = async() =>{
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data= await res.json();
        

        if(res.ok){
          setUserPosts(data.posts);
          if(data.posts.length<9){
            setShowMore(false);
          }
        }
        
      } catch (error) {
        console.log(error.message);
        
        
      }
    };
    if(currentUser.isAdmin){
      fetchPosts();
    }

  }, [currentUser._id,currentUser.isAdmin])

  const handelShowMore = async() => {
    const startIndex = userPosts.length;

    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data= await res.json();
      
      if(res.ok){
        setUserPosts((prev) => [...prev,...data.posts]);

        if(data.posts.length<9){
          setShowMore(false);
        }
      }
      
    } catch (error) {
      console.log(error.message);
      
    }

  }

  const deletePostOnClick = async() => {
    setShowModels(false);
    try {
      const res = await fetch(`/api/post/deletePost/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if(!res.ok){
        console.log(data.message);
      }
      else{
        setUserPosts((prev) => prev.filter((post)=>post._id!==postIdToDelete));
      }
      
    } catch (error) {
      console.log(error.message);
    }
    
  }
  return (
    <div className=" w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-200 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
    {currentUser.isAdmin && userPosts.length>0 ? (
      <>
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell >Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {userPosts.map((post) => (
            // eslint-disable-next-line react/jsx-key
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{post.updatedAt.substring(0, 10)}</Table.Cell>

                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                    <img src={post.image} alt={post.title} className="w-20 h-10 object-cover bg-gray-500" />
                  </Link>

                </Table.Cell>

                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>

                    <p className="font-medium text-gray-900 dark:text-white">{post.title}</p>


                  </Link>
                  
                </Table.Cell>

                <Table.Cell>{post.category}</Table.Cell>

                <Table.Cell>
                  <button onClick={() =>{
              setShowModels(true);
              setPostIdToDelete(post._id)
            }} className="font-medium text-red-600 cursor-pointer hover:underline">Delete</button>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/update-post/${post._id}`} className="font-medium text-teal-600 cursor-pointer hover:underline">Edit</Link>
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
      <h1>You got No post Yet</h1>
    )}

      <Modal show ={showModels}
        onClose={()=> setShowModels(false)}
        popup
        size='md'>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 mx-auto mb-5 text-gray-500' />
            <h3 className='font-semibold mb-5 text-lg m-4 text-gray-500 dark:text-gray-500'>Are You sure you want to Delete This Post?</h3>
            <div className="flex justify-center gap-8">
              <Button color='failure' onClick={deletePostOnClick}>Yes,I am Sure</Button>
              <Button color='success' onClick={()=>setShowModels(false)}>No,Cancel</Button>
            </div>

          </div>
        </ModalBody>

      </Modal>
      
      
    </div>
  )
}

export default DashPost
