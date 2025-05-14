import "../../assets/styles/AddNewPostModal.css";
import { useState } from "react";
import { api } from "../../services/api";

export default function AddNewPostModal({ onClose, onPostCreated }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            setError(null);

            if (!formData.description.trim()) {
                throw new Error("Please enter a description");
            }

            const newPost = {
                name: formData.name.trim() || 'Anonymous',
                description: formData.description.trim(),
                image: formData.image.trim() || null,
                likeCount: 0,
                bookmarks: false,
                time: new Date().toISOString()
            };

            const response = await api.createPost(newPost);
            console.log("Post created:", response);

            // Clear form
            setFormData({
                name: '',
                description: '',
                image: ''
            });

            // Notify parent component
            if (onPostCreated) {
                onPostCreated(response);
            }

            // Close modal
            onClose();

        } catch (err) {
            console.error("Error creating post:", err);
            setError(err.message || "Failed to create post");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-new-post-modal">
            <div className="add-new-post-modal-contents">
                <h3>Add a new post</h3>
                <form onSubmit={handleSubmit}>
                    <div className="add-new-post-fullname">
                        <label>Full Name</label>
                        <input 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="add-new-post-description">
                        <label>Description</label>
                        <input 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter your description"
                            required
                        />
                    </div>

                    <div className="add-new-post-imagelink">
                        <label>Image Link (Optional)</label>
                        <input 
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Enter your image link"
                        />
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="add-new-post-buttons">
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Posting..." : "Post"}
                        </button>
                        <button 
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
