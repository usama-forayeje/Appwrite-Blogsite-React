import  { useEffect, useState } from "react";
import parse from 'html-react-parser';
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import service from "../appwrite/appwrite.config";
import Container from "../components/container/Container";
import Button from "../components/Button";

function Post() {
  // State to hold the current post details
  const [post, setPost] = useState(null);

  // Extract the slug parameter from the URL
  const { slug } = useParams();
  const navigate = useNavigate();

  // Fetch logged-in user data from Redux
  const userData = useSelector((state) => state.auth.userData);

  // Check if the current user is the author of the post
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  // Fetch the post details when the slug changes
  useEffect(() => {
    if (slug) {
      service
        .getPost(slug)
        .then((post) => {
          if (post) setPost(post); // Set the post data if found
          else navigate("/"); // Redirect to home if post not found
        })
        .catch(() => navigate("/")); // Handle fetch errors
    } else {
      navigate("/"); // Redirect if no slug is provided
    }
  }, [slug, navigate]);

  // Function to handle post deletion
  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.image); // Delete associated image
        navigate("/"); // Redirect to home after deletion
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        {/* Featured Image Section */}
        <div className="relative flex justify-center w-full p-2 mb-4 border shadow-md rounded-xl">
          <img
            src={service.getFilePreview(post.featuredImage)} // Fetch the post's image preview
            alt={post.title}
            className="rounded-xl"
          />

          {/* Edit/Delete Buttons for Authors */}
          {isAuthor && (
            <div className="absolute flex right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Post Title */}
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>
        </div>

        {/* Post Content */}
        <div className="prose max-w-none">
          {parse(post.content)} {/* Safely parse and render post content */}
        </div>
      </Container>
    </div>
  ) : null; // Show nothing if post is not loaded yet
}

export default Post;
