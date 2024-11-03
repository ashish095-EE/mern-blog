import { useEffect,useState } from "react";
import { Link, useLocation } from "react-router-dom"
import {Sidebar} from 'flowbite-react'
import {HiUser, HiArrowSmRight} from 'react-icons/hi'
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { MdPostAdd } from "react-icons/md";
import { useSelector } from "react-redux";

export default function DashSidebar() {

  const {currentUser} = useSelector(state=>state.user);

    const dispatch = useDispatch();


    const location = useLocation()
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if(tabFromUrl){
            setTab(tabFromUrl);
        }
    
    }, [location.search]);

    const handelSignout = async () =>{
        try {
          const res = await fetch(`/api/user/signout`,{
            method: 'POST',
          })
          const data = await res.json();
    
          if(!res.ok){
            console.log(data.message);
          }
          else{
            dispatch(signOutSuccess());
          }
          
        } catch (error) {
          console.error(error);
          
        }
        
    }


  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className="flex flex-col gap-1">
                <Link to='/dashboard?tab=profile'>

                    <Sidebar.Item
                     
                    active = {tab==='profile'} 
                    icon={HiUser} 
                    label={currentUser.isAdmin ? 'Admin' : 'User'} 
                    labelColor='dark'
                    as={"div"}
                    >
                        Profile

                    </Sidebar.Item>

                </Link>

                {currentUser.isAdmin && (
                  <Link to='/dashboard?tab=posts'>

                  <Sidebar.Item
                   
                  active = {tab==='posts'} 
                  icon={MdPostAdd} 
                   
                  labelColor='dark'
                  as={"div"}
                  >
                      Posts

                  </Sidebar.Item>

              </Link>
                )}
                
                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' as='div' onClick={handelSignout}>
                    SignOut

                </Sidebar.Item>

                
            </Sidebar.ItemGroup>
        </Sidebar.Items>
        
      
    </Sidebar>
  )
}
