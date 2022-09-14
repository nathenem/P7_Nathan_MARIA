import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";

const Header = () => {
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
  return (
    <>
      <header>
        <a href="/">
          <img src={logo} alt="Logo Groupomania" style={{ width: 300 }} />
        </a>
        <form id="header__form" onSubmit={handleSubmit(selectOption)}>
          <button>Login</button>
          <button>Sign up</button>
        </form>
        <form>
          <a href="/login">Logout</a>
        </form>
      </header>
    </>
  );
};

export default Header;
