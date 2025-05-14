import "../../assets/styles/Sidebar.css";

export default function Sidebar({ activeTab, setActiveTab }) {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <button 
                    className={`sidebar-nav-item ${activeTab === "newsfeed" ? "active" : ""}`}
                    onClick={() => setActiveTab("newsfeed")}
                >
                    <i className="fa-solid fa-newspaper"></i>
                    <span>Newsfeed</span>
                </button>
                <button 
                    className="sidebar-nav-item disabled"
                    disabled
                >
                    <i className="fa-solid fa-heart"></i>
                    <span>Liked Posts</span>
                </button>
                <button 
                    className="sidebar-nav-item disabled"
                    disabled
                >
                    <i className="fa-solid fa-bookmark"></i>
                    <span>Bookmarks</span>
                </button>
            </nav>
        </aside>
    );
}