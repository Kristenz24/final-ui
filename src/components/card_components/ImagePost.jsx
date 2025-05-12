// Styles
import "../../assets/styles/ImagePost.css";

// Components
import PostHeader from "../ui_components/PostHeader.jsx";
import Image from "../ui_components/Image.jsx";
import PostDescription from "../ui_components/PostDescription.jsx";
import PostActions from "../ui_components/PostActions.jsx";

// Main Component
export default function ImagePost({image, description}) {
    return (
        <div className="image-post">
           <PostHeader status={"Posted an image."}/>
           <PostDescription description={description}/>
           <Image image={image}/>
           <PostActions/>
        </div>
    )
};
