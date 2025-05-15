// Styles
import "../../assets/styles/KebabModal.css";
import { useState, useRef, useEffect } from "react";
import EditModal from "./EditModal.jsx";
import DeleteModal from "./DeleteModal.jsx";
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
            const data = await api.updatePost(post.id, updatedPost);
            if (onEdit) onEdit(data);
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    };

    const handleDeleteConfirm = async () => {
        if (isDeleting) return;
        try {
            setIsDeleting(true);
            await api.deletePost(post.id);
            if (onDelete) onDelete(post.id);
            setShowDeleteModal(false);
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
                <DeleteModal
                    postId={post.id}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={() => {
                        setShowDeleteModal(false);
                        if (onDelete) onDelete(post.id);
                    }}
                />
            )}
        </div>
    );
}
