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
      <form className="forefront" onSubmit={handleSubmit(modifyPost)}>
        <p>Modify the post</p>
        <div>
          <label>Text Content</label>
          <input type="Text" {...register("textContent")} />
        </div>
        <div>
          <label>Image</label>
          <input type="file" accept="image/*" {...register("file")} />
        </div>
        <button>Commit changes</button>
      </form>
    </>
  );
};

export default ModifyForm;
