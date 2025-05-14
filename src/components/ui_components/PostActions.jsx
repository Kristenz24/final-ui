// Styles
import "../../assets/styles/PostActions.css";
import { useState, useEffect } from "react";

// Main Component
export default function PostActions({ likeCount: initialLikeCount, isBookmarked: initialIsBookmarked }) {
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [isLiked, setIsLiked] = useState(initialLikeCount > 0);
    const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);

    // Update state when props change
    useEffect(() => {
        setLikeCount(initialLikeCount);
        setIsLiked(initialLikeCount > 0);
        setIsBookmarked(initialIsBookmarked);
    }, [initialLikeCount, initialIsBookmarked]);

    return (
        <div className="post-actions">
            <button 
                className={`post-action-btn like-btn ${isLiked ? 'liked' : ''}`}
                disabled
            >
                <i className={`fa-${isLiked ? 'solid' : 'regular'} fa-heart`}></i>
                <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
            </button>
            <button 
                className={`post-action-btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                disabled
            >
                <i className={`fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark`}></i>
                <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
        </div>
    );
}
