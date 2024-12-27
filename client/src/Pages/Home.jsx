
import {Link} from "react-router-dom"
import CallToAction from "../components/CallToAction"
import { useEffect, useState } from "react"
import PostCard from "../components/PostCard";
export default function Home() {

  const[posts,setPosts]=  useState([]);

  useEffect(() => {
    const fetchPosts = async()=>{
      const res = await fetch(`/api/post/getposts?limit=6`);
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();
  }, []);


  return (
    <div>
      <div className="flex flex-col gap-6 lg:p-28 px-3 max-w06xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to My Blog App!</h1>
        <p className="text-gray-500 text-xs sm:text-sm">This is a simple blog application built with React and Firebase.</p>
        <Link to='/search' className="text-xs sm:text-sm text-teal-500 font-bold hover:underline">
          View all Post
        
        </Link>
      </div>

      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction/>
      </div>

      <div className="max-2-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {
          posts && posts.length >0 && (
            <div className="">
              <h2 className="text-2xl font-semibold text-center">Recent Post</h2>
              <div className="flex  gap-4 justify-center flex-wrap">
                {posts.map((post) => (
                  <PostCard key={post._id} post = {post}/>
                ))}
              </div>
              <Link to={'/search'} className="text-lg font-semibold text-teal-400 justify-center flex mt-2 hover:underline hover:text-teal-300"> View All Post</Link>
            </div>
          )
        }
      </div>


      
    </div>
  )
}
