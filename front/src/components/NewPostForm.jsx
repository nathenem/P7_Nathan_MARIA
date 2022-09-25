import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewPostForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const sendNewPost = (data) => {
    const formData = new FormData();
    formData.append("textContent", data.textContent);
    formData.append("image", data.file[0]);
    axios
      .post("http://localhost:3000/api/posts", formData)
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
      <form className="post_form" onSubmit={handleSubmit(sendNewPost)}>
        <div className="post_input">
          <label>&#0;</label>
          <textarea
            rows={7}
            maxLength={240}
            minLength={1}
            autoComplete={"off"}
            placeholder="Que souhaitez-vous dire ?"
            {...register("textContent")}
          />
        </div>
        <div className="post_input">
          <label for="file-upload" className="custom-file-input">
            <i class="fa-solid fa-paperclip"></i>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            {...register("file")}
          />
          <button>
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default NewPostForm;
