// Styles
import "../../assets/styles/PostForm.css";

// Main Component
export default function PostForm() {
    // REMINDER: change divs to sematic elements.
    return (
        <>
            <div className="postform">
                <div className="postform-row1">
                    <div className="postform-profile"></div>
                    <h2 className="postform-title">What's on your mind?</h2>
                </div>

                <div className="postform-row2">
                    <textarea placeholder="Share your thoughts..." className="postform-textbox"></textarea>
                </div>

                <div className="postform-row3">
                    <button className="postform-add-image-btn">
                        <i className="fa-solid fa-image"></i>
                    </button>

                    <button className="postform-post-btn">
                        <i className="fa-solid fa-paper-plane"></i>
                        <p>Post</p>
                    </button>
                </div>
            </div>
        </>
    )
};
