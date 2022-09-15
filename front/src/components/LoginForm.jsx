import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const loginSubmit = (data) => {
    axios
      .post("http://localhost:3000/api/auth/login", data)
      .then((res) => {
        console.log(res);
        localStorage.token = res.data.token;
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(loginSubmit)}>
        <p>Login</p>
        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register("password")} />
        </div>
        <button>Login</button>
      </form>
    </>
  );
};

export default LoginForm;
