import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

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
    <div>
      
      
    </div>
  )
}

export default DashPost