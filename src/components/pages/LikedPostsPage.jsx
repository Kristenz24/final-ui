import { useState, useEffect } from "react";
import { api } from "../../services/api";
import Post from "../card_components/Post";
import ImagePost from "../card_components/ImagePost";
import NoPostFound from "../card_components/NoPostFound";
import "../../assets/styles/HomePage.css";

export default function LikedPostsPage() {
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
            // Filter only liked posts
            const likedPosts = data.filter(post => post.likeCount > 0);
            setPosts(likedPosts);
        } catch (err) {
            setError('Failed to fetch posts');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (postId) => {
        try {
            const response = await api.likePost(postId);
            // If the post is no longer liked (likeCount is 0), remove it from the list
            if (response.likeCount === 0) {
                setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
            } else {
                // Otherwise update the post in the list
                setPosts(prevPosts => prevPosts.map(post => 
                    post.id === postId ? { ...post, likeCount: response.likeCount } : post
                ));
            }
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

    const handleEdit = (updatedPost) => {
        setPosts(prevPosts => prevPosts.map(post => post.id === updatedPost.id ? updatedPost : post));
    };

    const handleDelete = (deletedPostId) => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== deletedPostId));
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
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ) : (
                            <Post
                                post={post}
                                onLike={() => handleLike(post.id)}
                                onBookmark={() => handleBookmark(post.id)}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        )}
                    </div>
                ))
            )}
        </div>
    );
}