// Styles
import "../../assets/styles/Image.css";

export default function Image({image}) {
    return (
        <div className="image">
            <img src={image} alt="" />
        </div>
    )
};
