import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import {Button, Modal, ModalBody, ModalHeader, Table}  from "flowbite-react";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck,FaTimes } from "react-icons/fa";

const DashUsers = () => {

  const { currentUser } = useSelector((state)=>state.user);

  const [users,setUsers] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModels,setShowModels] = useState(false);
  const[userIdToDelete,setUserIdToDelete] = useState('');
  

  useEffect(() => {
    const fetchUsers = async() =>{
      try {
        const res = await fetch(`/api/user/getusers`)
        const data= await res.json();
        

        if(res.ok){
          setUsers(data.users);
          if(data.users.length<9){
            setShowMore(false);
          }
        }
        
      } catch (error) {
        console.log(error.message);
        
        
      }
    };
    if(currentUser.isAdmin){
      fetchUsers();
    }

  }, [currentUser._id,currentUser.isAdmin])

  const handelShowMore = async() => {
    const startIndex = users.length;

    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`)
      const data= await res.json();
      
      if(res.ok){
        setUsers((prev) => [...prev,...data.users]);

        if(data.posts.length<9){
          setShowMore(false);
        }
      }
      
    } catch (error) {
      console.log(error.message);
      
    }

  }

  const deleteUserOnClick  = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(res.ok){
        setUsers((prev) =>prev.filter((user) => user._id!==userIdToDelete))
        setShowMore(false);
        setShowModels(false);
      }
      
    } catch (error) {
      console.log(error.message);
      
    }

  }
  return (
    <div className=" w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-200 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
    {currentUser.isAdmin && users.length>0 ? (
      <>
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date Created</Table.HeadCell>
            <Table.HeadCell>Profile Pic</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell >Admin Status</Table.HeadCell>
            <Table.HeadCell>
              <span>Delete</span>
            </Table.HeadCell>
          </Table.Head>
          {users.map((user) => (
            // eslint-disable-next-line react/jsx-key
            <Table.Body className="divide-y" key={user._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>

                <Table.Cell>
                  
                    <img src={user.profilePicture} alt={user.username} className="w-10 h-10 object-cover bg-gray-500 rounded-full" />
                  

                </Table.Cell>

                

                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.isAdmin ? (<FaCheck className="text-green-500"/>) : (<FaTimes className="text-red-500"/>)  }</Table.Cell>
                

                <Table.Cell>
                  <button onClick={() =>{
              setShowModels(true);
              setUserIdToDelete(user._id)
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
      <h1>You got No Users Yet</h1>
    )}

      <Modal show ={showModels}
        onClose={()=> setShowModels(false)}
        popup
        size='md'>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 mx-auto mb-5 text-gray-500' />
            <h3 className='font-semibold mb-5 text-lg m-4 text-gray-500 dark:text-gray-500'>Are You sure you want to Delete This User?</h3>
            <div className="flex justify-center gap-8">
              <Button color='failure' onClick={deleteUserOnClick}>Yes,I am Sure</Button>
              <Button color='success' onClick={()=>setShowModels(false)}>No,Cancel</Button>
            </div>

          </div>
        </ModalBody>

      </Modal>
      
      
    </div>
  )
}

export default DashUsers
