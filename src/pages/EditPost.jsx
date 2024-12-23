import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import service from "../appwrite/appwrite.config";
import Container from "../components/container/Container";
import PostForm from "../components/postForm/PostForm";

function EditPost() {
  const [post, setPost] = useState([]);
  const slug = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8 ">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
