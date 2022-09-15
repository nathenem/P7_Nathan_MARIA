import { useForm } from "react-hook-form";
import axios from "axios";

const SignupForm = () => {
  const { register, handleSubmit } = useForm();
  const signupSubmit = (data) => {
    axios
      .post("http://localhost:3000/api/auth/signup", data)
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
      <form onSubmit={handleSubmit(signupSubmit)}>
        <p>Sign up</p>
        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />
        </div>
        <div>
          <label>Username</label>
          <input type="text" {...register("userName")} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register("password")} />
        </div>
        <button>Sign up</button>
      </form>
    </>
  );
};

export default SignupForm;
