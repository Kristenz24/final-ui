// Styles
import "../../assets/styles/KebabModal.css";

// Components
import DeletePostModal from "../card_components/DeletePostModal.jsx";

// Imports
import { useState } from "react"

// Main Component
export default function KebabModal() {
    const [kebabModal, setKebabModal] = useState(false);
    const [deletePostModal, setDeletePostModal] = useState(false);

    const handleKebabModal = () => {
        setKebabModal(!kebabModal);
    }

    const openDeletePostModal = () => {
        setDeletePostModal(true);
        setKebabModal(false);
    }

    const closeDeletePostModal = () => {
        setDeletePostModal(false);
    }

    return (
        <>
            <button className="kebabModal-btn" onClick={handleKebabModal}><i className="fa-solid fa-ellipsis"></i></button>
            {kebabModal &&
                <div className="kebabModal">
                    <button>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <div className="kebabModal-edit">
                            <h3>Edit</h3>
                            <p>Edit your post.</p>
                        </div>
                    </button>

                    {/* When clicked, it would show the delete confirmation modal */}
                    <button onClick={openDeletePostModal}>
                        <i className="fa-solid fa-trash"></i>
                        <div className="kebabModal-delete">
                            <h3>Delete</h3>
                            <p>Delete your post.</p>
                        </div>
                    </button>
                </div>
            } 
            {deletePostModal && 
                <div className="delete-post-modal-container">
                    <DeletePostModal onClose={closeDeletePostModal}/>
                </div>
            }
        </>
    )
};
