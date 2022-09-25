import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModifyForm = (props) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const modifyPost = (data) => {
    const formData = new FormData();
    formData.append("textContent", data.textContent);
    formData.append("image", data.file[0]);
    axios
      .put(`http://localhost:3000/api/posts/${props.post._id}`, formData)
      .then((res) => {
        console.log(res);
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
    console.log(data);
  };

  return (
    <>
      <form className="post_form" onSubmit={handleSubmit(modifyPost)}>
        <div className="post_input">
          <label>&#32;</label>
          <textarea type="Text" {...register("textContent")} />
        </div>
        <div className="post_input">
          <label for="file-modify" className="custom-file-input">
            <i class="fa-solid fa-paperclip"></i>
          </label>
          <input
            id="file-modify"
            type="file"
            accept="image/*"
            {...register("file")}
          />
          <button>
            <i class="fa-solid fa-check"></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default ModifyForm;
