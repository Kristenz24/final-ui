// Styles
import "../../assets/styles/DeletePostModal.css";

// Main Component
export default function DeletePostModal({onClose}) {  
    return (
        <div className="delete-post-modal" onClick={onClose}>
            <div className="delete-post-modal-contents" onClick={(e) => e.stopPropagation()}>
                <div className="delete-post-modal-texts">
                    <h2>Delete this post</h2>
                    <p>Are you sure you want to delete this post? This action cannot be undone.</p>
                </div>
                <div className="delete-post-modal-buttons">
                    <button>Delete</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
