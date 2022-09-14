import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "../components/Header";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const selectOption = (data) => {
    axios
      .post("http://localhost:3000/api/auth/login", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  };

  const loginSubmit = (data) => {
    axios
      .post("http://localhost:3000/api/auth/login", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  };

  const signupSubmit = (data) => {
    axios
      .post("http://localhost:3000/api/auth/signup", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  };

  return (
    <>
      <Header />
      <main>
        <form class="component" onSubmit={handleSubmit(selectOption)}>
          <p>Select Option</p>
          <div>
            <button>Login</button>
            <button>Sign up</button>
          </div>
        </form>
        <form class="component" onSubmit={handleSubmit(loginSubmit)}>
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
        <form class="component" onSubmit={handleSubmit(signupSubmit)}>
          <p>Sign up</p>
          <div>
            <label>Email</label>
            <input type="email" {...register("email")} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" {...register("password")} />
          </div>
          <button>Sign up</button>
        </form>
      </main>
    </>
  );
};

export default Login;
