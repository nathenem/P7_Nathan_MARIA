import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModifyForm from "./ModifyForm";

const Post = (props) => {
  const navigate = useNavigate();

  const deletePost = () => {
    axios
      .delete(`http://localhost:3000/api/posts/${props.post._id}`)
      .then((res) => {
        console.log(res);
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  return (
    <>
      <div className="forefront">
        <p className="author">@{props.post.author}</p>
        <p className="text">"{props.post.textContent}"</p>
        <p className="image">{props.post.file}</p>
        <p className="date">{props.post.date}</p>
        {props.post.author && ( //afficher le button modify uniquement pour l'auteur et les admins.
          <button classeName="modifybutton" onClick={"none"}>
            Modify
          </button>
        )}
        {props.post.author && ( //afficher le button delete uniquement pour l'auteur et les admins.
          <button classeName="deletebutton" onClick={deletePost}>
            Delete
          </button>
        )}
      </div>
      <div>
        <ModifyForm />
      </div>
    </>
  );
};

export default Post;
