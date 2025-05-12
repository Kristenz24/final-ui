// Styles
import "../../assets/styles/PostHeader.css"

// Components
import KebabModal from "./KebabModal.jsx";

// Main Component
export default function PostHeader({status}) {
    return (
        <div className="post-header">
            <div className="post-header-profile"></div>
            <div className="post-header-text">
                <h2 className="post-header-title">Anonymous <span>{status}</span></h2>
                <p className="post-header-time">few years ago</p>
            </div>

            <div className="post-header-menu">
                <KebabModal/>
            </div>
        </div>
    )
};
