// Styles
import "../../assets/styles/KebabModal.css";
import { useState, useRef, useEffect } from "react";
import EditModal from "./EditModal.jsx";
import { api } from "../../services/api";

// Main Component
export default function KebabModal({ post, onEdit, onDelete }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        setIsOpen(false);
        setShowEditModal(true);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        setIsOpen(false);
        setShowDeleteModal(true);
    };

    const handleEditSubmit = async (updatedPost) => {
        try {
            const response = await fetch(`http://localhost:8080/mingoy/api/posts/${post.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: updatedPost.description,
                    image: updatedPost.image
                })
            });
            
            if (!response.ok) throw new Error('Failed to update post');
            
            const data = await response.json();
            if (onEdit) onEdit(data);
            setShowEditModal(false);
            window.location.reload(); // Refresh the page after successful edit
        } catch (error) {
            console.error('Error updating post:', error);
            throw error; // Re-throw to let EditModal handle the error
        }
    };

    const handleDeleteConfirm = async () => {
        if (isDeleting) return;
        
        try {
            setIsDeleting(true);
            const response = await fetch(`http://localhost:8080/mingoy/api/posts/${post.id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Failed to delete post');
            
            if (onDelete) onDelete(post.id);
            setShowDeleteModal(false);
            window.location.reload(); // Refresh the page after successful delete
        } catch (error) {
            console.error('Error deleting post:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="kebab-menu" ref={menuRef}>
            <button className="kebab-button" onClick={toggleMenu}>
                <i className="fa-solid fa-ellipsis"></i>
            </button>
            {isOpen && (
                <div className="kebab-dropdown">
                    <div className="kebab-item" onClick={handleEdit}>
                        <i className="fa-solid fa-pen"></i>
                        <div className="content">
                            <span className="main-text">Edit</span>
                            <span className="subtext">Edit your post</span>
                        </div>
                    </div>
                    <div className="kebab-item delete" onClick={handleDelete}>
                        <i className="fa-solid fa-trash"></i>
                        <div className="content">
                            <span className="main-text">Delete</span>
                            <span className="subtext">Delete your post</span>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <EditModal
                            post={post}
                            onClose={() => setShowEditModal(false)}
                            onEdit={handleEditSubmit}
                        />
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Delete Post</h2>
                        <p>Are you sure you want to delete this post?</p>
                        <div className="modal-actions">
                            <button 
                                className="modal-button cancel-button"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="modal-button delete-button"
                                onClick={handleDeleteConfirm}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
