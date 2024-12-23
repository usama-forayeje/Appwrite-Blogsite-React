
import { Link } from "react-router";
import service from "../appwrite/appwrite.config";
import PropTypes from 'prop-types';

function PostCard({ $id, title, image, description = "", className = "" }) {
  return (
    <div className={`rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <Link to={`/post/${$id}`} className="block">
        <div className="relative bg-gray-200 pb-2/3">
          {image ? (
            <img
              src={service.getFilePreview(image)}
              alt={title}
              className="absolute top-0 left-0 object-cover w-full h-full"
            />
          ) : (
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-gray-500">
              No Image Available
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-900 truncate">{title}</h2>
          {description && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
          )}
        </div>
      </Link>
    </div>
  );
}
PostCard.propTypes = {
  $id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
};

export default PostCard;
