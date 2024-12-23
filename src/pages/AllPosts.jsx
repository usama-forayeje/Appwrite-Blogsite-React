import { useEffect } from "react";
import { useState } from "react";
import { Container } from "../components/container/Container";
import { PostCard } from "../components/PostCard";
import service from "../appwrite/appwrite.config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.getPosts([]).then((posts) => setPosts(posts));
  }, []);

  return (
    <div className="py-8">
      <Container>
        {posts?.map((post) => (
          <PostCard key={post.$id} post={post} />
        ))}
      </Container>
    </div>
  );
}

export default AllPosts;
