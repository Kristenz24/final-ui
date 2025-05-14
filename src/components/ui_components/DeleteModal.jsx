// Styles
import "../../assets/styles/Modal.css";
import { api } from "../../services/api";

export default function DeleteModal({ postId, onClose, onDelete }) {
    const handleDelete = async () => {
        try {
            await api.deletePost(postId);
            if (onDelete) onDelete();
            onClose();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Delete Post</h2>
                <p>Are you sure you want to delete this post? This action cannot be undone.</p>
                <div className="modal-actions">
                    <button 
                        className="modal-button cancel-button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className="modal-button delete-button"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
} 