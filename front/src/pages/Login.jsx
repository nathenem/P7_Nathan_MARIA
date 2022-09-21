import Header from "../components/Header";
import MainAuth from "../components/MainAuth";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Login = () => {
  const selectOption = () => {};

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      <main className="background">
        <MainAuth />
        <LoginForm />
        <SignupForm />
      </main>
      <Footer />
    </>
  );
};

export default Login;
