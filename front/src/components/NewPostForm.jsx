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
      <form id="post_form" onSubmit={handleSubmit(sendNewPost)}>
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
          <label>&#0;</label>
          <input type="file" accept="image/*" {...register("file")} />
        </div>
        <button>Envoyer</button>
      </form>
    </>
  );
};

export default NewPostForm;
