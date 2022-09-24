import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const signupSubmit = (data) => {
    axios
      .post("http://localhost:3000/api/auth/signup", data)
      .then((res) => {
        console.log(res);
        alert("le compte à bien été créer, veuillez vous identifier.");
        navigate(0);
      })
      .post("http://localhost:3000/api/auth/login", data)
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    console.log(data);
  };

  return (
    <>
      <form className="login_form" onSubmit={handleSubmit(signupSubmit)}>
        <h1>S'inscrire</h1>
        <div className="login_input">
          <label>Nom d'utilisateur :</label>
          <input type="text" {...register("userName")} />
        </div>
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

export default SignupForm;
