// Styles
import "../../assets/styles/Modal.css";
import { useState } from "react";

export default function EditModal({ post, onClose, onEdit }) {
    const [description, setDescription] = useState(post?.description || '');
    const [imageLink, setImageLink] = useState(post?.image || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting || !post?.id) return;

        try {
            setIsSubmitting(true);
            setError(null);
            
            const updatedPost = {
                description,
                image: imageLink || null
            };

            await onEdit(updatedPost);
        } catch (error) {
            console.error('Error updating post:', error);
            setError('Failed to update post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Edit Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What's on your mind?"
                            className="edit-textarea"
                            rows="4"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageLink">Image Link (optional)</label>
                        <input
                            id="imageLink"
                            type="url"
                            value={imageLink}
                            onChange={(e) => setImageLink(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="edit-input"
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <div className="modal-actions">
                        <button 
                            type="button"
                            className="modal-button cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="modal-button save-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 