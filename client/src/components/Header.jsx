import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link ,useLocation,useNavigate } from "react-router-dom";
import {AiOutlineSearch} from "react-icons/ai"
import {FaMoon,FaSun} from "react-icons/fa"
import { useSelector, useDispatch} from 'react-redux'
import {toggleTheme} from '../redux/theme/themeSlice';
import { signOutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";





export default function Header() {
    const path = useLocation().pathname;
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const[searchTerm,setSearchTerm] = useState('')
    const {currentUser} = useSelector(state=> state.user);
    const {theme} = useSelector(state=> state.theme);


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const serachTermFromUrl = urlParams.get('serachTerm'); 
        console.log(searchTerm);


    }, [location.search])

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
    const handelSubmit  = async (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('serachTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`search?${searchQuery}`);
        
    }
  return (
    <Navbar className="border-b-2">
        <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">

            <h2><span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Offside</span> Tales</h2>

        </Link>

        <form action="#" onSubmit={handelSubmit}>
            <TextInput
            type="text"
            placeholder="search"
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
             />
        </form>

        <Button className="w-12 h-10 lg:hidden border-b-2" color='grey' pill>
            <AiOutlineSearch />
        </Button>

        

        

        <div className="flex gap-2 md:order-2">
            <Button className="w-12 h-10 lg: border " color='grey' pill onClick={() => dispatch(toggleTheme())}>
                {theme==='light' ? <FaSun/> : <FaMoon />}


            </Button>

            {currentUser ? ( <>
            
                <Link to={'/create-post'}>
                    <Button gradientDuoTone="purpleToBlue" outline>Create Post</Button>
                </Link>
              
              <Dropdown arrowIcon={false} inline
                  label={<Avatar
                      alt="user"
                      img={currentUser.profilePicture}
                      rounded />}>
                      <Dropdown.Header>
                          <span className="block text-sm">@{currentUser.username}</span>
                          <span className="block text-sm font-medium   truncate">{currentUser.email}</span>

                          <Link to={'/dashboard?tab=profile'}>
                              <Dropdown.Item>Profile</Dropdown.Item>
                          </Link>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={handelSignout}>Signout </Dropdown.Item>
                      </Dropdown.Header>


                  </Dropdown></>

                   



            ): 
            (
                <Link to="/signin">
                    <Button gradientDuoTone="purpleToBlue" outline>Sign-In</Button>
                </Link>

                
            )}

            

            <Navbar.Toggle />

            

        </div>
        <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={"div"} >
                    <Link to='/' >Home</Link>
                    
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={"div"}>
                    <Link to='/about' >About</Link>
                    
                    
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={"div"}>
                    <Link to='/projects'>Projects</Link>
                    
                </Navbar.Link>
        </Navbar.Collapse>
      
    </Navbar>
  )
}
