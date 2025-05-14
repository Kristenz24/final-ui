// Styles
import "../../assets/styles/PostHeader.css"

// Components
import KebabModal from "./KebabModal.jsx";

// Main Component
export default function PostHeader({ name, time, status, menu, post, onEdit, onDelete }) {
    return (
        <div className="post-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div className="post-header-profile" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ddd', marginRight: '10px' }}></div>
            <div className="post-header-info" style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{name}</h3>
                <p style={{ margin: '2px 0', fontSize: '14px', color: '#666' }}>{status}</p>
                <p style={{ margin: '2px 0', fontSize: '12px', color: '#999' }}>{new Date(time).toLocaleString()}</p>
            </div>
            <div className="post-header-menu">
                {menu || <KebabModal post={post} onEdit={onEdit} onDelete={onDelete} />}
            </div>
        </div>
    )
};
