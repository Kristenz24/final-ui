import { useState } from "react";
import "../assets/styles/HomePage.css";
import Sidebar from "../components/ui_components/Sidebar";
import OpenAddPostModal from "../components/ui_components/OpenAddPostModal";
import NewsfeedPage from "../components/pages/NewsfeedPage";
import LikedPostsPage from "../components/pages/LikedPostsPage";
import BookmarksPage from "../components/pages/BookmarksPage";

export default function HomePage() {
    const [activeTab, setActiveTab] = useState('newsfeed');
    const [showAddPostModal, setShowAddPostModal] = useState(false);

    const handlePostCreated = (newPost) => {
        console.log('New post created:', newPost);
        // Refresh the current page to show the new post
        window.location.reload();
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'newsfeed':
                return <NewsfeedPage />;
            case 'liked':
                return <LikedPostsPage />;
            case 'bookmarks':
                return <BookmarksPage />;
            default:
                return <NewsfeedPage />;
        }
    };

    return (
        <div className="homepage">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <main className="main-content">
                {renderContent()}
                <OpenAddPostModal onPostCreated={handlePostCreated} />
            </main>
        </div>
    );
} 