const BASE_URL = 'https://final-api-t8sh.onrender.com/mingoy/api';

export const api = {
    // Get all posts
    getAllPosts: async () => {
        try {
            console.log('Fetching posts from:', `${BASE_URL}/posts`);
            const response = await fetch(`${BASE_URL}/posts`);
            console.log('API Response status:', response.status);
            console.log('API Response headers:', Object.fromEntries(response.headers.entries()));
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error('Failed to fetch posts');
            }
            
            const data = await response.json();
            console.log('API Response data:', data);
            
            // If data is wrapped in a property, extract it
            if (data && !Array.isArray(data) && data.data) {
                console.log('Extracting data from response.data');
                return data.data;
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    },

    // Create a new post
    createPost: async (postData) => {
        try {
            console.log('Creating post:', postData);
            const response = await fetch(`${BASE_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error('Failed to create post');
            }

            const data = await response.json();
            console.log('Created post:', data);
            return data;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    },

    // Like a post
    likePost: async (postId) => {
        try {
            console.log('Liking post:', postId);
            const response = await fetch(`${BASE_URL}/posts/${postId}/like`, {
                method: 'PATCH',
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error('Failed to like post');
            }
            const data = await response.json();
            console.log('Liked post:', data);
            return data;
        } catch (error) {
            console.error('Error liking post:', error);
            throw error;
        }
    },

    // Bookmark a post
    bookmarkPost: async (postId) => {
        try {
            console.log('Bookmarking post:', postId);
            const response = await fetch(`${BASE_URL}/posts/${postId}/bookmark`, {
                method: 'PATCH',
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error('Failed to bookmark post');
            }
            const data = await response.json();
            console.log('Bookmarked post:', data);
            return data;
        } catch (error) {
            console.error('Error bookmarking post:', error);
            throw error;
        }
    }
}; 