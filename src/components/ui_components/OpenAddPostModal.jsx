import "../../assets/styles/OpenAddPostModal.css"
import { useState } from "react";
import AddNewPostModal from "../card_components/AddNewPostModal";

export default function OpenAddPostModal({ onPostCreated }) {
    const [openAddPostModal, setopenAddPostModal] = useState(false)

    const openAddPostModalHandler = () => {
        setopenAddPostModal(true);
    }

    const closeAddPostModal = () => {
        setopenAddPostModal(false);
    }

    return (
        <div className="add-open-post-modal">
            <div className="add-open-post-modal-button" onClick={openAddPostModalHandler}>
                <i className="fa-solid fa-feather"></i>
            </div>
            {openAddPostModal && (
                <AddNewPostModal 
                    onClose={closeAddPostModal}
                    onPostCreated={onPostCreated}
                />
            )}
        </div>
    )
};
