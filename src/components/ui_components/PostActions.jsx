// Styles
import "../../assets/styles/PostActions.css";

// Imports
import { useState } from "react";

// Main Component
export default function PostActions() {
    const [like, setLike] = useState(false);
    const [bookmark, setBookmark] = useState(false);

    const handleLike = () => { 
        setLike(!like);
    }

    const handleBookmark= () => {
        setBookmark(!bookmark);
    }
    return (
        <div className="post-actions">
            <button className="like-btn" onClick={handleLike}>
                <i className={!like ? "fa-regular fa-heart" : "fa-solid fa-heart"}></i> 
            </button>

            <button className="bookmark-btn" onClick={handleBookmark}>
                <i className={!bookmark ? "fa-regular fa-bookmark": "fa-solid fa-bookmark"}></i> 
            </button>
        </div>
    )
};
