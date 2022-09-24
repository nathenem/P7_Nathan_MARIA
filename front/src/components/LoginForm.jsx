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
      <form className="login_form" onSubmit={handleSubmit(loginSubmit)}>
        <h1>S'identifier</h1>
        <div className="login_input">
          <label>Adresse mail :</label>
          <input type="email" {...register("email")} />
        </div>
        <div className="login_input">
          <label>Mot de passe :</label>
          <input type="password" {...register("password")} />
        </div>
        <button>Je valide</button>
      </form>
    </>
  );
};

export default LoginForm;
