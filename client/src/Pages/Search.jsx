import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
    const navigate = useNavigate();
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');

        if (searchTermFromUrl||sortFromUrl || categoryFromUrl) {
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl || 'desc',
                category: categoryFromUrl || 'uncategorized',
            });

            
        }

        const fetchPosts=  async() =>{
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`);

            if(res.ok){
                const data = await res.json();
                setPosts(data.posts);
                setLoading(false);

                if(data.posts.length===9){
                    setShowMore(true);
                }
                else{
                    setShowMore(false);
                }
                
            }
            
        };
        fetchPosts();
    }, [location.search]); // Add the dependency array here

    const handelChange = (e) =>{
        if(e.target.id==='searchTerm'){
            const searchTerm = e.target.value;
            setSidebarData({...sidebarData, searchTerm: searchTerm });
        }
        if(e.target.id==='sort') {
            const order = e.target.value || 'desc';
            setSidebarData({...sidebarData, sort: order });
        }
        if(e.target.id==='category'){
            const category = e.target.value|| 'uncategorized';
            setSidebarData({...sidebarData, category: category });
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault();

        const urlParams=  new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('category', sidebarData.category);
        urlParams.set('sort', sidebarData.sort);
        const searchQuery=  urlParams.toString();
        navigate(`/search?${searchQuery}`);


    };
    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setPosts([...posts, ...data.posts]);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      };

    

    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
                <form className="flex flex-col gap-8" onSubmit={handelSubmit}>
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Search Term:</label>
                        <TextInput placeholder="Search..." id="searchTerm" type="text" value={sidebarData.searchTerm} onChange={handelChange} />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Sort:</label>

                        <Select onChange={handelChange} id="sort" value={sidebarData.sort}>
                            <option value="desc">Latest</option>
                            <option value="asc">Oldest</option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Category:</label>

                        <Select onChange={handelChange} id="category" value={sidebarData.category}>
                            <option value="desc">Uncategorized</option>
                            <option value="sports">Sports</option>
                            <option value="travel">Travel</option>
                            <option value="philosophical">Philosophical</option>
                        </Select>
                    </div>

                    <Button type="submit" outline gradientDuoTone='purpleToBlue'>
                        Apply Filters

                    </Button>
                </form>
            </div>
            <div className="w-full">
                <h1 className="text-3xl font\ sm:border-b borser-gray-500 p-3 mt-5">Post results:</h1>
                <div className="p-7 flex flex-wrap gap-4">
                    {!loading && posts.length===0 && (
                        <p className="text-xl text-gray-500">No Posts Found.</p>
                    )}
                    {
                        loading && <p className="text-xl tetx-gray-500">Loading...</p>
                    }
                    {!loading && posts && posts.map((post)=> (
                        <PostCard key={post._id} post = {post} />
                    ))}
                     {showMore && (
                        <button
                        onClick={handleShowMore}
                        className='text-teal-500 text-lg hover:underline p-7 w-full'
                        >
                        Show More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
