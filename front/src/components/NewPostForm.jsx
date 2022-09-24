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
      <form className="forefront" onSubmit={handleSubmit(sendNewPost)}>
        <p>New post</p>
        <div>
          <label>Text Content</label>
          <input type="Text" {...register("textContent")} />
        </div>
        <div>
          <label>Image</label>
          <input type="file" accept="image/*" {...register("file")} />
        </div>
        <button>Send new post</button>
      </form>
    </>
  );
};

export default NewPostForm;
