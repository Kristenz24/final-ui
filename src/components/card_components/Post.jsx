// Styles
import "../../assets/styles/Post.css";

// Components
import PostHeader from "../ui_components/PostHeader.jsx";
import PostDescription from "../ui_components/PostDescription.jsx";
import PostActions from "../ui_components/PostActions.jsx";
import KebabModal from "../ui_components/KebabModal.jsx";
import ImagePost from "./ImagePost.jsx";

// Main Component
export default function Post({ post, onLike, onBookmark, onEdit, onDelete }) {
    // Debug log
    console.log("Post component received:", post);
    
    // Fallback for missing data
    if (!post) {
        console.error("Post component received null or undefined post");
        return <div>No post data available</div>;
    }

    if (!post.id) {
        console.error("Post missing required id:", post);
        return <div>Invalid post data</div>;
    }

    // Common props for both post types
    const commonProps = {
        post,
        onLike,
        onBookmark,
        onEdit,
        onDelete
    };
    
    // If post has an image, render ImagePost
    if (post.image) {
        return <ImagePost {...commonProps} />;
    }
    
    // Otherwise render regular Post
    return (
        <div className="post">
            <PostHeader 
                name={post.name || 'Anonymous'}
                time={post.time}
                status="Posted a status."
                post={post}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            
            {post.description && (
                <PostDescription description={post.description} />
            )}
            
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
