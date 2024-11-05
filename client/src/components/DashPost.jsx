import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import {Table}  from "flowbite-react";
import { Link } from "react-router-dom";

const DashPost = () => {

  const { currentUser } = useSelector((state)=>state.user);

  const [userPosts,setUserPosts] = useState([]);
  console.log(userPosts);

  useEffect(() => {
    const fetchPosts = async() =>{
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data= await res.json();
        

        if(res.ok){
          setUserPosts(data.posts);
        }
        
      } catch (error) {
        console.log(error.message);
        
        
      }
    };
    if(currentUser.isAdmin){
      fetchPosts();
    }

  }, [currentUser._id,currentUser.isAdmin])
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-200 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
    {currentUser.isAdmin && userPosts.length>0 ? (
      <>
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {userPosts.map((post) => (
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 " key={post._id}>
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
                  <p className="font-medium text-red-600 cursor-pointer hover:underline">Delete</p>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/update-post/${post._id}`} className="font-medium text-teal-600 cursor-pointer hover:underline">Edit</Link>
                </Table.Cell>
                
              </Table.Row>
            </Table.Body>
          ))}

        </Table>
      
      </>
    ):(
      <h1>You have no post yet</h1>
    )}
      
      
    </div>
  )
}

export default DashPost
