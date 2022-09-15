import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewPostForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const sendNewPost = (data) => {
    axios
      .post("http://localhost:3000/api/posts", data)
      .then((res) => {
        console.log(res);
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
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
          <input type="file" accept=".png,.jpeg,.jpg" {...register("file")} />
        </div>
        <button>Send new post</button>
      </form>
    </>
  );
};

export default NewPostForm;
