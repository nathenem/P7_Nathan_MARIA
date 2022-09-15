import { useForm } from "react-hook-form";
import axios from "axios";

const NewPostForm = () => {
  const { register, handleSubmit } = useForm();
  const sendNewPost = (data) => {
    axios
      .post("http://localhost:3000/api/posts", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(sendNewPost)}>
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
