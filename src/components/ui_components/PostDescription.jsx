// Styles
import "../../assets/styles/PostDescription.css"

// Main Component
export default function PostDescription({description}) {
    return (
        <div className="post-description">
            <p>{description}</p>
        </div>
    )
};
