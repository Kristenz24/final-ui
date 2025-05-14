import { useState, useEffect } from "react";
import { api } from "../../services/api";
import Post from "../card_components/Post";
import ImagePost from "../card_components/ImagePost";
import NoPostFound from "../card_components/NoPostFound";
import "../../assets/styles/HomePage.css";

export default function BookmarksPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const data = await api.getAllPosts();
            // Filter only bookmarked posts
            const bookmarkedPosts = data.filter(post => post.bookmarks === true);
            setPosts(bookmarkedPosts);
        } catch (err) {
            setError('Failed to fetch posts');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (postId) => {
        try {
            await api.likePost(postId);
            // Fetch fresh data after liking
            fetchPosts();
        } catch (err) {
            console.error('Failed to like post:', err);
        }
    };

    const handleBookmark = async (postId) => {
        try {
            await api.bookmarkPost(postId);
            // Fetch fresh data after bookmarking
            fetchPosts();
        } catch (err) {
            console.error('Failed to bookmark post:', err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="main-content">
            {!Array.isArray(posts) || posts.length === 0 ? (
                <NoPostFound />
            ) : (
                posts.map((post, index) => (
                    <div key={post.id || `post-${index}`}>
                        {post.image ? (
                            <ImagePost
                                post={post}
                                onLike={() => handleLike(post.id)}
                                onBookmark={() => handleBookmark(post.id)}
                            />
                        ) : (
                            <Post
                                post={post}
                                onLike={() => handleLike(post.id)}
                                onBookmark={() => handleBookmark(post.id)}
                            />
                        )}
                    </div>
                ))
            )}
        </div>
    );
} 