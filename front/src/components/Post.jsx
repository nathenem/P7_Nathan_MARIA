import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModifyForm from "./ModifyForm";
import { useState } from "react";

const Post = (props) => {
  const [modify, setModify] = useState(false);

  const navigate = useNavigate();

  const modifyPost = () => {
    setModify(!modify);
  };

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

  const likePost = (data) => {
    axios
      .put(`http://localhost:3000/api/posts/${props.post._id}/like`, {
        like: data,
        userId: props.user._id,
      })
      .then((res) => {
        console.log(res);
        navigate(0);
      })
      .catch((err) => {
        console.log("log d'erreur :", err);
        alert(err.response.data.message);
      });
  };

  return (
    <>
      {props.user && (
        <div className="forefront">
          <p className="author">@{props.post.author}</p>
          <p className="text">"{props.post.textContent}"</p>
          {props.post.imageUrl && (
            <p className="image">
              <img src={props.post.imageUrl} alt={""} />
            </p>
          )}
          <p className="date">{props.post.date}</p>
          {(props.user.isAdmin || props.post.authorId === props.user._id) && (
            <button classeName="modifybutton" onClick={modifyPost}>
              Modify
            </button>
          )}
          {(props.user.isAdmin || props.post.authorId === props.user._id) && (
            <button classeName="deletebutton" onClick={deletePost}>
              Delete
            </button>
          )}
        </div>
      )}
      {modify && <ModifyForm post={props.post} />}
      <button onClick={() => likePost(1)}>Like</button>
      <p>Likes : {props.post.usersLiked.length}</p>
      <button onClick={() => likePost(-1)}>Dislike</button>
      <p>Disikes : {props.post.usersDisliked.length}</p>
    </>
  );
};

export default Post;
