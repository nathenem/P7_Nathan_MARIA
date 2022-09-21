import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModifyForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const modifyPost = (data) => {
    axios
      .post("http://localhost:3000/api/posts", data)
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
      <form className="forefront" onSubmit={handleSubmit(modifyPost)}>
        <p>Modify the post</p>
        <div>
          <label>Text Content</label>
          <input type="Text" {...register("textContent")} />
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("file.filename", "file")}
          />
        </div>
        <button>Commit changes</button>
      </form>
    </>
  );
};

export default ModifyForm;
