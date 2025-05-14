import { useState } from "react";
import NewsfeedPage from "./NewsfeedPage";
import LikedPostsPage from "./LikedPostsPage";
import BookmarksPage from "./BookmarksPage";
import AddNewPostModal from "../card_components/AddNewPostModal";
import "../../assets/styles/HomePage.css";

export default function HomePage() {
    const [activeTab, setActiveTab] = useState("newsfeed");
    const [showAddPostModal, setShowAddPostModal] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case "newsfeed":
                return <NewsfeedPage />;
            case "liked":
                return <LikedPostsPage />;
            case "bookmarks":
                return <BookmarksPage />;
            default:
                return <NewsfeedPage />;
        }
    };

    return (
        <div className="homepage-container">
            <div className="sidebar">
                <button 
                    className={`nav-button ${activeTab === "newsfeed" ? "active" : ""}`}
                    onClick={() => setActiveTab("newsfeed")}
                >
                    Newsfeed
                </button>
                <button 
                    className={`nav-button ${activeTab === "liked" ? "active" : ""}`}
                    onClick={() => setActiveTab("liked")}
                >
                    Liked Posts
                </button>
                <button 
                    className={`nav-button ${activeTab === "bookmarks" ? "active" : ""}`}
                    onClick={() => setActiveTab("bookmarks")}
                >
                    Bookmarks
                </button>
                <button 
                    className="add-post-button"
                    onClick={() => setShowAddPostModal(true)}
                >
                    Add New Post
                </button>
            </div>

            <div className="content-area">
                {renderContent()}
            </div>

            {showAddPostModal && (
                <AddNewPostModal
                    onClose={() => setShowAddPostModal(false)}
                />
            )}
        </div>
    );
} 