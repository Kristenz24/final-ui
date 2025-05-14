// Styles
import "../../assets/styles/ImagePost.css";

// Components
import PostHeader from "../ui_components/PostHeader.jsx";
import PostDescription from "../ui_components/PostDescription.jsx";
import PostActions from "../ui_components/PostActions.jsx";
import KebabModal from "../ui_components/KebabModal.jsx";

// Main Component
export default function ImagePost({ post, onLike, onBookmark, onEdit, onDelete }) {
    return (
        <div className="image-post">
            <PostHeader 
                name={post.name || 'Anonymous'}
                time={post.time}
                status="Posted an image."
                menu={
                    <KebabModal
                        post={post}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                }
            />
            
            {post.description && (
                <PostDescription description={post.description} />
            )}

            <div className="image-container">
                <img 
                    src={post.image} 
                    alt={post.description || "Post image"} 
                    className="post-image"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YwZjJmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                    }}
                />
            </div>
            
            <PostActions 
                postId={post.id}
                likeCount={post.likeCount || 0}
                isBookmarked={post.bookmarks || false}
                onLike={onLike}
                onBookmark={onBookmark}
            />
        </div>
    );
}
