import { useEffect, useState } from "react";
import service from "../appwrite/appwrite.config";
import PostCard from '../components/PostCard'
function Home() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
 

  if (posts.length === 0 ) {
    return (
        <div>
            <h2>NO DATA FOUND</h2>
        </div>
    )
  }
  return (
    <div className="w-full py-8 ">
        <div>
            {posts.map(post => (
                <div key={post.$id}>
                    <PostCard {...post} />
                </div>
            ))}
        </div>
    </div>
  )
   

}

export default Home;
