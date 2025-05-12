// Styles
import "../../assets/styles/Post.css";

// Components
import PostHeader from "../ui_components/PostHeader.jsx";
import PostDescription from "../ui_components/PostDescription.jsx";
import PostActions from "../ui_components/PostActions.jsx";

// Main Component
export default function Post({description}) {
    return (
        <>
            <div className="post">
                <PostHeader status={"Posted a note."}/>
                <PostDescription description={description}/>
                <PostActions />
            </div>
        </>
    )
};
