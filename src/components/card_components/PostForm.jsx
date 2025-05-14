// Styles
import "../../assets/styles/PostForm.css";
import { useState } from "react";
import { api } from "../../services/api";

// Main Component
export default function PostForm({ onPostCreated }) {
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePost = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!description.trim()) {
                throw new Error("Please enter a description");
            }

            const newPost = {
                description: description.trim(),
                likeCount: 0,
                bookmarks: false,
                time: new Date().toISOString()
            };

            const response = await api.createPost(newPost);
            console.log("Post created:", response);

            // Clear form
            setDescription("");

            // Notify parent component
            if (onPostCreated) {
                onPostCreated(response);
            }

        } catch (err) {
            console.error("Error creating post:", err);
            setError(err.message || "Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="postform">
            <div className="postform-row1">
                <div className="postform-profile"></div>
                <h2 className="postform-title">What's on your mind?</h2>
            </div>

            <div className="postform-row2">
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Share your thoughts..." 
                    className="postform-textbox"
                ></textarea>
            </div>

            {error && (
                <div className="postform-error">
                    {error}
                </div>
            )}

            <div className="postform-row3">
                <button 
                    className="postform-post-btn"
                    onClick={handlePost}
                    disabled={loading}
                >
                    {loading ? "Posting..." : "Post"}
                </button>
            </div>
        </div>
    );
}
