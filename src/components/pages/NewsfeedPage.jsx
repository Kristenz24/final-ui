import { useState, useEffect } from "react";
import { api } from "../../services/api";
import Post from "../card_components/Post";
import PostForm from "../card_components/PostForm";
import "../../assets/styles/HomePage.css";

export default function NewsfeedPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            console.log('Starting to fetch posts...');
            const response = await api.getAllPosts();
            console.log('Raw API response:', response);
            
            // Ensure we have valid data
            if (!response) {
                console.error('No response data received');
                setPosts([]);
                return;
            }

            // Handle both array and object responses
            let postsData = Array.isArray(response) ? response : 
                          (response.data && Array.isArray(response.data)) ? response.data : [];
            
            console.log('Processed posts data:', postsData);
            
            // Validate each post has required fields
            const validPosts = postsData.filter(post => {
                const isValid = post && typeof post === 'object' && 
                              (post.description || post.image) && 
                              post.id;
                if (!isValid) {
                    console.warn('Invalid post data:', post);
                }
                return isValid;
            });

            console.log('Valid posts to display:', validPosts);
            setPosts(validPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setError("Failed to load posts");
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('NewsfeedPage mounted, fetching posts...');
        fetchPosts();
    }, []);

    useEffect(() => {
        console.log('Posts state updated:', posts);
    }, [posts]);

    const handlePostCreated = (newPost) => {
        console.log('New post created:', newPost);
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    if (loading) {
        return <div className="loading">Loading posts...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="main-content">
            <PostForm onPostCreated={handlePostCreated} />
            <div className="posts-container">
                {posts.length === 0 ? (
                    <div className="no-posts">No posts available</div>
                ) : (
                    posts.map((post) => (
                        <div key={post.id} className="post-wrapper">
                            <Post
                                post={post}
                                onLike={() => console.log('Like clicked for post:', post.id)}
                                onBookmark={() => console.log('Bookmark clicked for post:', post.id)}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
} 